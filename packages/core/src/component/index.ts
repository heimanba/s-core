import fs from 'fs';
import { uuid } from '../libs/utils';
import ContextService, { IComponentContext } from './context.service';
import {
  generateComponentPath,
  IComponentPath,
  installDependency,
  downloadComponent,
  buildComponentInstance,
} from './load.service';
import { execArgs } from './args.services';

const { packTo } = require('@serverless-devs/s-zip');

export class Component {
  state: any;
  protected id: string;
  protected $$context: IComponentContext;

  // @Logger logger: ILogger;

  constructor(id?: string, context?: IComponentContext) {
    this.id = id || uuid();
    this.$$context = context || new ContextService();
  }

  async init() {
    await this.$$context.init();
    this.state = await this.$$context.getState(this.id);
  }

  async save() {
    const { id, state } = this;
    await this.$$context.setState(id, state);
  }

  credentials;

  args(args: any, boolList?: [], moreList?: [], argsList?: []) {
    return execArgs(args, boolList, moreList, argsList);
  }

  help(inputs: any, message: any) {
    try {
      const tempList = inputs.Args.split(' ');
      if (tempList.includes('--help') || tempList.includes('-h')) {
        console.log(`\n    ${message.description}\n`);
        if (message.commands && message.commands.length > 0) {
          console.log('\n  Commands: ');
          for (let i = 0; i < message.commands.length; i++) {
            if (message.commands[i].name && message.commands[i].desc) {
              console.log(`      ${message.commands[i].name}: ${message.commands[i].desc}`);
            }
          }
        }
        if (message.args && message.args.length > 0) {
          console.log('\n  Args: ');
          for (let i = 0; i < message.args.length; i++) {
            if (message.args[i].name && message.args[i].desc) {
              console.log(`      ${message.args[i].name}: ${message.args[i].desc}`);
            }
          }
        }
        console.log('\n');
        process.exit(0);
      }
    } catch (ex) {
      // ignore exception
    }
  }

  async zip(packToParame: any) {
    try {
      return await packTo(packToParame);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * @description 主要的方法，用于load组件。
   * 组件会下载到 ~/.s/components 目录下面
   * @param name fc@0.0.1组件名，注册在应用市场的组件
   * @param componentAlias 组件别名
   * @param provider SERVERLESS厂商
   */
  async load(name: string, componentAlias = '', provider = 'alibaba') {
    const { componentPathRoot } = this.$$context;
    let version;
    [name, version] = name.split('@');
    const componentPaths: IComponentPath = await generateComponentPath(
      {
        name,
        provider,
        version,
      },
      componentPathRoot,
    );
    const { componentPath } = componentPaths;

    if (!fs.existsSync(componentPaths.lockPath)) {
      await downloadComponent(componentPath, { name, provider });
      await installDependency(name, componentPaths);
    }
    const componentInstance = buildComponentInstance(
      this.$$context,
      componentPath,
      this.id,
      componentAlias,
    );
    return componentInstance;
  }
}
