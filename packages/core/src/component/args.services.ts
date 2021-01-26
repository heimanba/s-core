function getNewKey(key: any) {
  try {
    const tempKey = key.split('-');
    let resultKey = '';
    for (let i = 0; i < tempKey.length; i++) {
      if (i === 0) {
        resultKey = tempKey[0];
      } else {
        resultKey = resultKey + tempKey[i][0].toUpperCase() + tempKey[i].slice(1, tempKey[i].length);
      }
    }
    return resultKey;
  } catch (ex) {
    return key;
  }
}

export function execArgs(args: any, boolList?: [], moreList?: [], argsList?: []) {
  /*
   *  变更：¬
   *     1. 二级指令增加转换，例如a-b变成aB
   *     2. 主Key增加转换，例如a-b变成aB
   */
  const argsData: any = {};
  const commandData: any = [];
  const argsStatus = argsList === undefined;
  boolList = boolList || [];
  moreList = moreList || [];
  argsList = argsList || [];
  args = args || '';
  if (args) {
    const tempList = args.split(' ');
    let temp: any;
    let sourceTemp: any;
    let listTemp: any;
    let indexTemp: any;
    for (let i = 0; i < tempList.length; i++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (tempList[i].startsWith('-') && (argsStatus || argsList.indexOf(tempList[i]) >= 0)) {
        // eslint-disable-next-line no-unused-vars
        indexTemp = i;
        let tempArgs = tempList[i].startsWith('--')
          ? tempList[i].slice(2, tempList[i].length)
          : tempList[i].slice(1, tempList[i].length);
        tempArgs = getNewKey(tempArgs);
        // eslint-disable-next-line no-prototype-builtins
        if (argsData.hasOwnProperty(tempArgs)) {
          listTemp = tempArgs;
        } else {
          argsData[tempArgs] = undefined;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        temp = boolList.indexOf(tempArgs) !== -1 ? undefined : tempArgs;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        sourceTemp = boolList.indexOf(tempArgs) !== -1 ? undefined : tempList[i];
      } else if (temp) {
        if (temp === listTemp) {
          // 此时是传入了list数组
          if (i - indexTemp > 1) {
            const tempStrIndex = argsData[temp].length - 1;
            argsData[temp][tempStrIndex] = (argsData[temp][tempStrIndex] ? `${argsData[temp][tempStrIndex]} ` : '') + tempList[i];
          } else {
            if (!(argsData[temp] instanceof Array)) {
              argsData[temp] = [argsData[temp]];
            }
            argsData[temp].push(tempList[i]);
          }
        } else {
          // @ts-ignore
          // eslint-disable-next-line no-lonely-if
          if (moreList.indexOf(temp) !== -1 || argsList.indexOf(sourceTemp) !== -1) {
            argsData[temp] = (argsData[temp] ? `${argsData[temp]} ` : '') + tempList[i];
          } else if (argsData[temp]) {
            commandData.push(tempList[i]);
          } else {
            argsData[temp] = tempList[i];
          }
        }
      } else {
        // 修复非-/--开头的变成驼峰格式
        commandData.push(tempList[i]);
      }
    }
  }
  for (const eveItem in argsData) {
    if (argsData[eveItem] === undefined) {
      argsData[eveItem] = true;
    }
  }
  return {
    Commands: commandData,
    Parameters: argsData,
  };
}
