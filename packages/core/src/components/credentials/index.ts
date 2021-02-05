import inquirer from 'inquirer';
import AddManager from './addaccess.service';
import getAccess from './getaccess.service';

export default async function credential(inputs: any) {
  const Provider = inputs.Project?.Provider;
  const providerMap = getAccess({ Provider });

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
    const inputProviderAlias = `${addManager.provider}.${addManager.aliasName || 'default'}`;
    addManager.inputFullData[inputProviderAlias] = result;
    addManager.writeData(addManager.globalFilePath, addManager.inputFullData);
    return result;
  }
  return providerMap[access];
}
