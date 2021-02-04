import fs from 'fs-extra';
import inquirer from 'inquirer';
import { S_ROOT_HOME_COMPONENT } from '../libs/common';
import {
  buildComponentInstance,
  downloadComponent,
  generateComponentPath,
  IComponentPath,
  installDependency,
} from './load.service';
import { GetManager } from './utils/getAccess';
import { AddManager } from './utils/addAccess';

export interface IComponent {
  load: (name: string, provider: string) => Promise<any>;
}

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
  async load(name: string, provider: string) {
    const baseArgs = this.getBaseArgs(name, provider);
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
  async credentials(inputs: any) {
    if (inputs.Credentials && Object.keys(inputs.Credentials).length > 0) {
      return inputs.Credentials;
    }
    const Provider = inputs.Project?.Provider;
    const configUserInput = {
      Provider,
    };

    const getManager = new GetManager();
    await getManager.initAccessData(configUserInput);
    const providerMap: {
      [key: string]: any;
    } = await getManager.getUserSecretID(configUserInput);

    // 选择
    const selectObject = [];
    Object.keys(providerMap).forEach((item) => {
      const temp = {
        name: item.startsWith('project')
          ? `${item.replace('project.', 'project: ')}`
          : `${item.replace(Provider + '.', Provider + ': ')}`,
        value: item,
      };
      if (Provider) {
        if (item.startsWith(Provider) || item.startsWith('project')) {
          selectObject.push(temp);
        }
      } else {
        selectObject.push(temp);
      }
    });

    selectObject.push({ name: 'Create a new account', value: 'create' });
    let access = '';
    await inquirer
      .prompt([
        {
          type: 'list',
          name: 'access',
          message: 'Please select an access:',
          choices: selectObject,
        },
      ])
      .then((answers: any) => {
        access = answers.access;
      });
    if (access === 'create') {
      const addManager = new AddManager();
      const result = await addManager.inputLengthZero(addManager.provider);

      // 2020-9-23 修复部署过程中增加密钥信息，无法存储到系统的bug
      const inputProviderAlias = `${addManager.provider}.${addManager.aliasName || 'default'}`;
      addManager.inputFullData[inputProviderAlias] = result;
      addManager.writeData(addManager.globalFilePath, addManager.inputFullData);

      return result;
    }
    return providerMap[access];
  }
}
