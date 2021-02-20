import { providerArray, providerObject, providerCollection, checkProviderList } from './constant';
import inquirer from 'inquirer';
import fs from 'fs';
import yaml from 'js-yaml';

interface ConfigMap {
  [key: string]: any;
}

export default class AddManager {
  protected inputProviderAlias = '';
  protected inputSecretID: any;
  provider: string;
  aliasName: string;

  output() {
    console.log('');
    console.info(`  Provider: ${providerObject[this.provider]} (${this.provider})`);
    if (this.aliasName) {
      console.info(`    Alias: ${this.aliasName}`);
    }
    // eslint-disable-next-line guard-for-in
    for (const item in this.inputSecretID) {
      console.info(`    ${item}: ${this.inputSecretID[item]}`);
    }
    console.log('');
  }

  // 用户输入参数为0的时候
  async inputLengthZero(provider: any = undefined) {
    if (!provider) {
      await inquirer.prompt(checkProviderList).then((answers: any) => {
        this.provider = answers.provider;
      });
    } else {
      this.provider = provider.toLocaleLowerCase();
    }

    if (!providerArray.includes(this.provider)) {
      throw Error(
        `The cloud vendor[${this.provider}] was not found. [alibaba/aws/azure/baidu/google/huawei/tencent/custom]`,
      );
    }
    const promptList = providerCollection[this.provider];
    promptList.push({
      type: 'input',
      message: 'Please create alias for key pair. If not, please enter to skip',
      name: 'aliasName',
      default: 'default', // 默认值
    });

    await inquirer.prompt(promptList).then((answers: any) => {
      this.inputSecretID = answers;
    });

    Object.keys(this.inputSecretID).forEach((item) => {
      if (item === 'aliasName') {
        this.aliasName = this.inputSecretID[item];
        delete this.inputSecretID[item];
      }
    });
    this.inputProviderAlias = this.provider + '.' + this.aliasName || 'default';

    return this.inputSecretID;
  }

  async writeFileWay(filePath: string, text: ConfigMap) {
    this.output();
    try {
      await fs.writeFileSync(filePath, yaml.dump(text));
    } catch (err) {
      throw Error('Configuration failed');
    }
  }

  writeData(filePath: string, text: ConfigMap) {
    const isExists: boolean = fs.existsSync(filePath);
    // 当前文件不存在
    if (!isExists) {
      this.writeFileWay(filePath, text);
    } else {
      const userInformation: any = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
      // 文件存在，且不为空；
      // eslint-disable-next-line no-eq-null,eqeqeq
      if (userInformation != null) {
        const userProviderAlias: string[] = Object.keys(userInformation);
        const isExistProviderAlias: boolean = userProviderAlias.includes(this.inputProviderAlias);
        // 全局配置是否含有用户输入的provider.alias
        if (isExistProviderAlias) {
          throw Error(
            `Provider + Alias already exists. You can set a different alias or modify it through: s config update -p ${
              this.provider
            } -a ${this.aliasName || 'default'}`,
          );
        } else {
          try {
            fs.appendFileSync(filePath, yaml.dump(text));
            this.output();
            console.info('Configuration successful');
          } catch (err) {
            throw Error('Configuration failed');
          }
        }
      } else {
        this.writeFileWay(filePath, text);
      }
    }
  }
}
