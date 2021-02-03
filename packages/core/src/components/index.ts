import { S_ROOT_HOME_COMPONENT } from '../libs/common';
import fs from 'fs-extra';
import {
  buildComponentInstance,
  downloadComponent,
  generateComponentPath,
  IComponentPath,
  installDependency,
} from './load.service';


export class Component {
  private getBaseArgs(name: string, provider: string) {
    const [componentName, version] = name.split('@');
    return { name: componentName, version, provider };
  }

  /**
   * @description 主要的方法，用于load组件。
   * 组件会下载到 ~/.s/components 目录下面
   * name: 组件名, 默认load最新版本组件，支持load某个版本组件 load@0.11
   * provider: SERVERLESS厂商
   */
  async load(name?: string, provider?: string) {
    const baseArgs = this.getBaseArgs(name, provider);
    const componentPaths: IComponentPath = await generateComponentPath(baseArgs, S_ROOT_HOME_COMPONENT);
    const { componentPath, lockPath } = componentPaths;
    // 通过是否存在 .s.lock文件来判断
    if (!fs.existsSync(lockPath)) {
      await downloadComponent(componentPath, baseArgs);
      await installDependency(baseArgs.name, componentPaths);
    }
    return await buildComponentInstance(componentPath);
  }
}
