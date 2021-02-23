# s-core 使用文档

s-core 是 Serverless-Devs 的一个官方组件，通过该组件您可以轻松处理一些有趣的事情：

- 组件加载
- 组件参数转换
- 日志输出
- HTTP 请求,文件下载
- 状态上报
- 打包压缩
- 获取密钥信息

## 安装

```
npm i @serverless-devs/core -S
```

## 整体使用方法

1. decorator 使用方式

- logger demo

```typescript
const { Component, IComponent } = require('@serverless-devs/core');

class LoggerDemo {
  @HLogger('S-CORE') logger: ILogger;

  getDefaultLog() {
    this.logger.info('测试');
  }
}
```

- component demo

```typescript
const { Component, IComponent } = require('@serverless-devs/core');

class ComponentDemo {
  @HComponent() component: IComponent;

  async deploy() {
    await this.component.load('fc', 'alibaba');
  }
}
```

2. 类使用方式(在纯函数中)

- logger demo

```typescript
const { Logger } = require('@serverless-devs/core');

function loggerDemo() {
  Logger.log('abc', 'red');
  Logger.info('S-CORE', 'dankunTest');
}
```

- component demo

```typescript
const { Component } = require('@serverless-devs/core');

async function componentDemo() {
  return await Component.load('fc', 'alibaba');
}
```

## 详细文档

[logger ](https://github.com/heimanba/s-core/blob/master/packages/core/docs/loggger.md)

[component ](https://github.com/heimanba/s-core/blob/master/packages/core/docs/component.md)

[common(request/download/report) ](https://github.com/heimanba/s-core/blob/master/packages/core/docs/common.md)
