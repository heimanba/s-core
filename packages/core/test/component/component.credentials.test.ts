import { getAccessInfo } from '../../src/component/credentials.service';

const os = require('os');
const path = require('path');

describe('credentials.service.test', () => {
  it('test getAccessInfo', async () => {
    const Project = {
      ProjectName: 'ExpressComponent',
      Component: 'express',
      Provider: 'alibaba',
      AccessAlias: 'default',
    };
    const accessInfo = await getAccessInfo(Project, path.join(os.homedir(), '.s/access.yaml'));
    console.log(accessInfo);
    expect(accessInfo).not.toBeNaN();
  });
});
