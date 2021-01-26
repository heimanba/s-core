export interface IInputsCredentials {
  AccountID?: string;
  AccessKeyID?: string;
  AccessKeySecret?: string;
}

export interface IInputsProject {
  ProjectName?: string;
  Component?: string;
  Provider: string;
  AccessAlias?: string;
}

export interface IInputsProperties {
  Region?: string;
  Function?: any;
  Service?: any;
}

export interface iInputs {
  Properties: IInputsProperties;
  Credentials?: IInputsCredentials | object;
  Project: IInputsProject;
  Command?: string;
  Args?: string;
  State?: object;
}

export interface IComponentParams {
  name: string;
  provider: string;
  type?: string;
}

export interface ILogger {
  log: (message: any, context?: string) => any;
  error: (message: any, trace?: string, context?: string) => any;
  warn: (message: any, context?: string) => any;
  debug?: (message: any, context?: string) => any;
  verbose?: (message: any, context?: string) => any;
}