import { Component } from '../../src/components/index';

Component.load({
  name: 'fc@0.1.1',
  provider: 'alibaba',
}).then((res) => console.log(res));
