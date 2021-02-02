import { Component } from '../../src/decorator';


class ComponentDemo {
  // @ts-ignore
  @Component('fc', 'alibaba') component;
}

const componentDemo = new ComponentDemo();
componentDemo.component.load().then((res) => console.log(res));
