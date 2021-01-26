import fs from 'fs-extra';
import path from 'path';
import { getComponentVersion, getComponentDownloadUrl, execComponentDownload } from './services';
import { IComponentParams } from '../interface';
import { IComponentContext } from './context.service';

const { spawnSync } = require('child_process');


export interface IComponentPath {
  componentVersion: string;
  componentPath: string;
  lockPath: string;
}

export interface RepoTemplate {
  zipFile: string;
  subPath?: string;
  hasSubPath: boolean;
}

/**
 * @description 获取组件路径
 * @param name
 * @param provider
 * @param componentPathRoot 组件根目录
 */
export const generateComponentPath = async (
  { name, provider }: IComponentParams,
  componentPathRoot: string,
): Promise<IComponentPath> => {
  const Response = await getComponentVersion({ name, provider });
  const rootPath = `./${name}-${provider}@${Response.Version}`;

  // 如果有根路径
  if (componentPathRoot) {
    return {
      componentPath: path.resolve(componentPathRoot, rootPath),
      componentVersion: Response.Version,
      lockPath: path.resolve(componentPathRoot, rootPath, '.s.lock'),
    };
  } else {
    const componentPath = path.resolve(name);
    return {
      componentPath,
      componentVersion: Response.Version,
      lockPath: path.resolve(componentPath, '.s.lock'),
    };
  }
};

export const installDependency = async (
  name: string,
  { componentPath, componentVersion, lockPath }: IComponentPath,
) => {
  const existPackageJson = fs.existsSync(path.join(componentPath, 'package.json'));
  const existNodeModules = fs.existsSync(path.join(componentPath, 'node_modules'));
  if (existPackageJson && !existNodeModules) {
    console.log('Installing dependencies in serverless-devs core ...');
    const result = spawnSync('npm install --registry=https://registry.npm.taobao.org', [], {
      cwd: componentPath,
      stdio: 'inherit',
      shell: true,
    });
    if (result && result.status !== 0) {
      throw Error('> Execute Error');
    }
  }
  await fs.writeFileSync(lockPath, `${name}-${componentVersion}`);
};

export const downloadComponent = async (outputDir: string, { name, provider }: IComponentParams) => {
  await fs.ensureDirSync(outputDir);
  const Response = await getComponentDownloadUrl({ name, provider });
  await execComponentDownload(Response.Url, outputDir);
};

export const buildComponentInstance = async (context: IComponentContext, componentPath: string, id?: string, componentAlias?: string) => {
  const requiredComponentPath = componentPath.lastIndexOf('index') > -1 ? componentPath : path.join(componentPath, 'index');
  const baseChildComponent = await require(requiredComponentPath);
  const ChildComponent = baseChildComponent.default ? baseChildComponent.default : baseChildComponent;
  const childComponentId = `${id}.${componentAlias || ChildComponent.name}`;
  const childComponentInstance = new ChildComponent(childComponentId, context);
  if (childComponentInstance.init) {
    await childComponentInstance.init();
  }
  return childComponentInstance;
};
