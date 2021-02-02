import { getComponentVersion } from '../../src/components/services';

describe('component.service.test', () => {
  it('测试请求成功', async () => {
    const result = await getComponentVersion({
      name: 'fc',
      provider: 'alibaba',
      type: 'component',
    });
    expect(result.Version).not.toBeNull();
  });
});
