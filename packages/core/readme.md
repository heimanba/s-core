# s-core使用文档

s-core是Serverless-Devs 的一个官方组件，通过该组件您可以轻松处理一些有趣的事情：

- 组件加载
- 组件参数转换
- 日志输出
- HTTP请求,文件下载
- 状态上报

## 整体使用方法

1. 下载依赖

```
npm i @serverless-devs/core -S
```

2. decorator形式使用

```typescript
// logger 使用
class LoggerDemo {
  @Logger('S-CORE') logger: ILogger;

  getDefaultLog() {
    this.logger.info('测试');
  }
}

// Component 使用
class ComponentDemo {
  @Component() component;

  async deploy() {
    await this.component.load('fc', 'alibaba');
  }
}
```

## 详细文档
[logger ](https://github.com/heimanba/s-core/blob/master/packages/core/loggger.md)
[component ](https://github.com/heimanba/s-core/blob/master/packages/core/component.md)
[common(request/download/report) ](https://github.com/heimanba/s-core/blob/master/packages/core/common.md)
