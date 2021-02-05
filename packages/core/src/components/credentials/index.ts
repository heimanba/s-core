import inquirer from 'inquirer';
import GetManager from './getaccess.service';
import AddManager from './addaccess.service';

export default async function credential(inputs: any) {
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
    const result = await addManager.inputLengthZero(Provider);

    // 2020-9-23 修复部署过程中增加密钥信息，无法存储到系统的bug
    const inputProviderAlias = `${addManager.provider}.${addManager.aliasName || 'default'}`;
    addManager.inputFullData[inputProviderAlias] = result;
    addManager.writeData(addManager.globalFilePath, addManager.inputFullData);

    return result;
  }
  return providerMap[access];
}
