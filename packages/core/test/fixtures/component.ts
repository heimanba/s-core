import { HComponent } from '../../src/decorator';

class CredentialsDemo {
  @HComponent() component;

  credentials() {
    const input = {
      Args: '',
      State: {},
      Project: {
        ProjectName: 'ExpressComponent',
        Component: 'express',
        Provider: 'google',
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
    this.component.credentials(input);
  }
  async load() {
    await this.component.load('fc', 'alibaba');
  }
  help() {
    const sections = [
      {
        header: 'A typical app',
        content: 'Generates something {italic very} important.',
      },
      {
        header: 'Options',
        optionList: [
          {
            name: 'input',
            typeLabel: '{underline file}',
            description: 'The input to process.',
          },
          {
            name: 'help',
            description: 'Print this usage guide.',
          },
        ],
      },
    ];
    this.component.help(sections);
  }
}

const demo = new CredentialsDemo();

// demo.credentials();
// demo.load();
demo.help();
