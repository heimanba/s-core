import { HComponent } from '../../src';


class ComponentDemo {
  @HComponent() component;

  async deploy() {
    await this.component.load('fc', 'alibaba');
  }
}

const componentDemo = new ComponentDemo();
componentDemo.component.load().then((res) => console.log(res));
