import { Component } from '../../src/component/index';

const input = {
  Args: '',
  State: {},
  Credentials: {},
  // Credentials: {
  //   AccountID: '1740298130743624',
  //   AccessKeyID: 'LTAI4FxEP1GR6Dyx6rGQJyn1',
  //   AccessKeySecret: 'yVdXr5IjOk5oUunWy0fcGBYJ1kmlCw',
  // },
  Project: {
    ProjectName: 'ExpressComponent',
    Component: 'express',
    Provider: 'alibaba',
    AccessAlias: 'dankun',
  },
  Properties: {
    Region: 'cn-hangzhou',
    Function: {
      Name: 's-function-1611581703839',
      Description: 'This Function Powered By Serverless Devs Tool',
      Handler: 'index.handler',
      MemorySize: 512,
      Runtime: 'custom',
      Timeout: 60,
      Triggers: [Array],
      CodeUri: './src',
    },
    Service: {
      Name: 's-service',
      Description: 'This Service Powered By Serverless Devs Tool',
    },
  },
};

const component = new Component();
component.credentials(input);
