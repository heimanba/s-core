import { Component } from '../../src/decorator';


class ComponentDemo {
  @Component() component;

  async deploy() {
    await this.component.load('fc', 'alibaba');
  }
}

const componentDemo = new ComponentDemo();
componentDemo.component.load().then((res) => console.log(res));
