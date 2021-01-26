import { omitObject, map } from '../libs/utils';
import { AddManager } from '../libs/addAccess';
import { IInputsProject, iInputs } from '../interface';
import { S_ROOT_HOME_ACCESS } from '../libs/common';

const inquirer = require('inquirer');
const fs = require('fs-extra');
const yaml = require('js-yaml');

const CREATE_ACCESS = '_create';

/**
 * @description 获取access访问权限信息
 * @param Project
 * @param filePath
 */
export async function getAccessInfo(Project: IInputsProject, filePath: string) {
  const isExist: boolean = fs.existsSync(filePath);
  let userAccessInfo = {};
  if (!isExist) {
    return userAccessInfo;
  }
  const userInformation = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
  if (userInformation) {
    const { Provider } = Project;
    const { AccessAlias } = Project;
    if (Provider) {
      const provider: string = Provider.toLocaleLowerCase();
      if (AccessAlias) {
        const accessAlias = `${provider}.${AccessAlias}`;
        userAccessInfo = omitObject(userInformation, (value, key) => key === accessAlias);
      } else {
        userAccessInfo = omitObject(userInformation, (value, key) => key.split('.')[0] === provider);
      }
    }
  }
  return userAccessInfo;
}

/**
 * @description access访问权限提示
 * @param Provider
 * @param userAccessInfo
 */
async function getAccessPrompt(Provider: string, userAccessInfo) {
  const selectAccessList = map(userAccessInfo, (value, key) => ({
    name: `${key.replace(`${Provider}.`, `${Provider}: `)}`,
    value: key,
  }));
  selectAccessList.push({ name: 'Create a new account', value: CREATE_ACCESS });
  const { access } = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'access',
        message: 'Please select an access:',
        choices: selectAccessList,
      },
    ]);
  return access;
}

/**
 * @description 授权证书
 * @param inputs
 */
export async function credentials(inputs: iInputs) {
  const { Project } = inputs;
  const { Provider } = Project;
  const userAccessInfo = await getAccessInfo(Project, S_ROOT_HOME_ACCESS);
  const access: string = await getAccessPrompt(Provider, userAccessInfo);
  if (access === CREATE_ACCESS) {
    const addManager = new AddManager();
    const result = await addManager.inputLengthZero(Provider);
    // 2020-9-23 修复部署过程中增加密钥信息，无法存储到系统的bug
    const inputProviderAlias = `${Provider}.${addManager.aliasName || 'default'}`;
    addManager.inputFullData[inputProviderAlias] = result;
    addManager.writeData(addManager.globalFilePath, addManager.inputFullData);
    return result;
  }
  return userAccessInfo[access];
}
