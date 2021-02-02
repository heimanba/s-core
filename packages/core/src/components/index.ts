import { S_ROOT_HOME_COMPONENT } from '../libs/common';
import fs from 'fs-extra';
import {
  buildComponentInstance,
  downloadComponent,
  generateComponentPath,
  IComponentPath,
  installDependency,
} from './load.service';

export interface IComponentLoad {
  name: string;
  provider: 'alibaba';
}

export class Component {
  static async load(params: IComponentLoad) {
    const { name: componentName, provider } = params;
    const [name, version] = componentName.split('@');
    const componentPaths: IComponentPath = await generateComponentPath({ name, provider, version },
      S_ROOT_HOME_COMPONENT);
    const { componentPath, lockPath } = componentPaths;
    // 通过是否存在 .s.lock文件来判断
    if (!fs.existsSync(lockPath)) {
      await downloadComponent(componentPath, { name, provider });
      await installDependency(name, componentPaths);
    }
    return await buildComponentInstance(componentPath);
  }
}
