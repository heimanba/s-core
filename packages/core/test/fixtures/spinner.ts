import { request, spinner } from '../../src/common';
import { sleep } from '../../src/libs/utils';

class SpinnerDemo {
  async start() {
    const vm = spinner('开始执行');
    await sleep(1000);
    vm.text = 'hhh';
    vm.color = 'red';
    await sleep(1000);
    // vm.succeed('执行成功');
    vm.stop();
  }
  async test_request_hint() {
    await request('https://tool.serverlessfans.com/error/center', {
      method: 'post',
      data: {
        tag: 'fc',
        error: 'error',
      },
      hint: {
        spinning: '错误上报',
        success: '错误上报成功',
        error: '错误上报失败',
      },
    });
  }
}

const demo = new SpinnerDemo();

// demo.start();
demo.test_request_hint();
