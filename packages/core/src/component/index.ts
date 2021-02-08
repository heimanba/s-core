import fs from 'fs-extra';
import { S_ROOT_HOME_COMPONENT } from '../libs/common';
import {
  buildComponentInstance,
  downloadComponent,
  generateComponentPath,
  IComponentPath,
  installDependency,
} from './load.service';
import credentials from './credentials';
import commandLineUsage, { Section } from 'command-line-usage';
import { IInputs, IV1Inputs } from '../interface';
import { Logger } from '../logger';
import minimist from 'minimist';

export declare class IComponent {
  load: (name: string, provider: string) => Promise<any>;
  credentials: (inputs: IInputs | IV1Inputs) => Promise<any>;
  help: (inputs: IInputs | IV1Inputs) => null;
  args: (inputs: IInputs | IV1Inputs, opts: object) => object;
}

export class Component {
  /**
   * @description 主要的方法，用于load组件。
   * 组件会下载到 ~/.s/components 目录下面
   * name: 组件名, 默认load最新版本组件，支持load某个版本组件 load@0.11
   * provider: SERVERLESS厂商
   */
  async load(componentName: string, provider: string) {
    const [name, version] = componentName.split('@');
    const baseArgs = { name, version, provider };
    const componentPaths: IComponentPath = await generateComponentPath(
      baseArgs,
      S_ROOT_HOME_COMPONENT,
    );
    const { componentPath, lockPath } = componentPaths;
    // 通过是否存在 .s.lock文件来判断
    if (!fs.existsSync(lockPath)) {
      await downloadComponent(componentPath, baseArgs);
      await installDependency(baseArgs.name, componentPaths);
    }
    return await buildComponentInstance(componentPath);
  }

  async credentials(inputs: IInputs | IV1Inputs) {
    return await credentials(inputs);
  }

  args(inputs: IInputs | IV1Inputs, opts?: object) {
    // @ts-ignore
    const argsStr = inputs?.args || inputs?.Args;
    if (!argsStr) {
      return {};
    }
    return minimist(argsStr.split(/[\s]+/g), opts || {});
  }


  help(sections: Section) {
    const usage = commandLineUsage(sections);
    Logger.log(usage);
  }
}
