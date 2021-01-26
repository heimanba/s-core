import { uuid, readJsonFile, writeJsonFile } from '../libs/utils';
import { S_ROOT_HOME_COMPONENT } from '../libs/common';

const path = require('path');
const fs = require('fs');

interface IContextParams {
  stateFileRoot?: string; // load cache file dir
  componentPathRoot?: string; // load component dir
  credentials?: any;
}

export interface IComponentContext {
  init?: () => void;
  stateFileRoot: string;
  componentPathRoot: string;
  getState?: (id: string) => any;
  setState?: (id: string, state: any) => any;
}

export default class ContextService implements IComponentContext {
  protected state: any;
  protected credentials = {};
  stateFileRoot: string;
  componentPathRoot: string;
  protected id: any;

  constructor(context: IContextParams = {}) {
    const { stateFileRoot, componentPathRoot } = context;
    const currentSDir = path.join(process.cwd(), '.s');
    this.componentPathRoot = componentPathRoot ? path.resolve(componentPathRoot) : S_ROOT_HOME_COMPONENT;
    if (!stateFileRoot && !fs.existsSync(currentSDir)) {
      fs.mkdirSync(currentSDir);
    }
    this.stateFileRoot = stateFileRoot ? path.resolve(stateFileRoot) : currentSDir;
    this.credentials = context.credentials || {};
    this.id = uuid();
    this.state = { id: this.id };
  }

  async init() {
    const contextStatePath = path.join(this.stateFileRoot, 'identify_.json');
    if (fs.existsSync(contextStatePath)) {
      this.state = readJsonFile(contextStatePath);
    } else {
      writeJsonFile(contextStatePath, this.state);
    }
    this.id = this.state.id;
  }

  async getState(id: string) {
    const stateFilePath = path.join(this.stateFileRoot, `${id}.json`);
    let result = {};
    if (fs.existsSync(stateFilePath)) {
      result = readJsonFile(stateFilePath);
    }
    return result;
  }

  async setState(id: string, state: any) {
    const stateFilePath = path.join(this.stateFileRoot, `${id}.json`);
    if (!fs.existsSync(stateFilePath)) {
      fs.openSync(stateFilePath, 'w');
    }
    fs.writeFileSync(stateFilePath, JSON.stringify(state, null, 2), 'utf-8');
    return state;
  }
}
