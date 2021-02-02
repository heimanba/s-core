import report from '../../src/common/report';

class ReportDemo {
  error() {
    report('错误上报', {
      type: 'error',
      context: 'fc',
    });
  }
  component() {
    report('组件数据上报', {
      type: 'component',
      context: 'fc',
      params: {
        action: 'deploy',
        account: '123435',
      },
    });
  }
}

const demo = new ReportDemo();

demo.error();
demo.component();
