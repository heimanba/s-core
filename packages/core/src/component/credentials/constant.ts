/** @format */

export const providerArray: string[] = [
  'alibaba',
  'baidu',
  'huawei',
  'aws',
  'azure',
  'google',
  'tencent',
  'custom',
];

export const providerObject: any = {
  alibaba: 'Alibaba Cloud',
  baidu: 'Baidu Cloud',
  huawei: 'Huawei Cloud',
  aws: 'AWS Cloud',
  azure: 'Azure Cloud',
  google: 'Google Cloud',
  tencent: 'Tencent Cloud',
};

export const providerCollection: any = {
  alibaba: [
    {
      type: 'input',
      message: 'AccountID',
      name: 'AccountID',
      default: '', // 默认值
    },
    {
      type: 'input',
      message: 'AccessKeyID',
      name: 'AccessKeyID',
      default: '', // 默认值
    },
    {
      type: 'input',
      message: 'AccessKeySecret',
      name: 'AccessKeySecret',
      default: '', // 默认值
    },
  ],

  aws: [
    {
      type: 'input',
      message: 'AccessKeyID',
      name: 'AccessKeyID',
      default: '', // 默认值
    },

    {
      type: 'input',
      message: 'SecretAccessKey',
      name: 'SecretAccessKey',
      default: '', // 默认值
    },
  ],

  huawei: [
    {
      type: 'input',
      message: 'AccessKeyID',
      name: 'AccessKeyID',
      default: '', // 默认值
    },

    {
      type: 'input',
      message: 'SecretAccessKey',
      name: 'SecretAccessKey',
      default: '', // 默认值
    },
  ],

  azure: [
    {
      type: 'input',
      message: 'KeyVaultName',
      name: 'KeyVaultName',
      default: '', // 默认值
    },

    {
      type: 'input',
      message: 'TenantID',
      name: 'TenantID',
      default: '', // 默认值
    },
    {
      type: 'input',
      message: 'ClentID',
      name: 'ClentID',
      default: '', // 默认值
    },

    {
      type: 'input',
      message: 'ClientSecret',
      name: 'ClientSecret',
      default: '', // 默认值
    },
  ],

  baidu: [
    {
      type: 'input',
      message: 'AccessKeyID',
      name: 'AccessKeyID',
      default: '', // 默认值
    },

    {
      type: 'input',
      message: 'SecretAccessKey',
      name: 'SecretAccessKey',
      default: '', // 默认值
    },
  ],
  google: [
    {
      type: 'input',
      message: 'PrivateKeyData',
      name: 'PrivateKeyData',
      default: '', // 默认值
    },
  ],

  tencent: [
    {
      type: 'input',
      message: 'AccountID',
      name: 'AccountID',
      default: '', // 默认值
    },
    {
      type: 'input',
      message: 'SecretID',
      name: 'SecretID',
      default: '', // 默认值
    },
    {
      type: 'input',
      message: 'SecretKey',
      name: 'SecretKey',
      default: '', // 默认值
    },
  ],
};

export const checkProviderList: any[] = [
  {
    type: 'list',
    name: 'provider',
    message: 'Please select a provider:',
    choices: [
      { name: 'Alibaba Cloud (alibaba)', value: 'alibaba' },
      { name: 'AWS (aws)', value: 'aws' },
      { name: 'Azure (azure)', value: 'azure' },
      { name: 'Baidu Cloud (baidu)', value: 'baidu' },
      { name: 'Google Cloud (google)', value: 'google' },
      { name: 'Huawei Cloud (huawei)', value: 'huawei' },
      { name: 'Tencent Cloud (tencent)', value: 'tencent' },
      { name: 'Custom', value: 'custom' },
    ],
  },
];

export function getInputData(program: any) {
  const inputSecretCheck: any = {};
  if (program.AccountID) {
    inputSecretCheck.AccountID = program.AccountID;
  }
  if (program.AccessKeyID) {
    inputSecretCheck.AccessKeyID = program.AccessKeyID;
  }
  if (program.AccessKeySecret) {
    inputSecretCheck.AccessKeySecret = program.AccessKeySecret;
  }
  if (program.SecretID) {
    inputSecretCheck.SecretID = program.SecretID;
  }
  if (program.SecretKey) {
    inputSecretCheck.SecretKey = program.SecretKey;
  }
  if (program.SecretAccessKey) {
    inputSecretCheck.SecretAccessKey = program.SecretAccessKey;
  }
  if (program.KeyVaultName) {
    inputSecretCheck.KeyVaultName = program.KeyVaultName;
  }
  if (program.TenantID) {
    inputSecretCheck.TenantID = program.TenantID;
  }
  if (program.ClientID) {
    inputSecretCheck.ClientID = program.ClientID;
  }
  if (program.ClientSecret) {
    inputSecretCheck.ClientSecret = program.ClientSecret;
  }
  if (program.PrivateKeyData) {
    inputSecretCheck.PrivateKeyData = program.PrivateKeyData;
  }

  return inputSecretCheck;
}
