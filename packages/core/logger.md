# Logger

## 使用

decorator使用方式(推荐)

```typescript
const {Logger, ILogger} = require('@serverless-devs/core/decorator')

class LoggerDemo {
  @Logger("S-CORE") logger: ILogger;

  getLog() {
    this.logger.log('abct', {color: 'red'});
  }
}
```

类使用方式(在纯函数中)

```typescript
const {Logger, ILogger} = require('@serverless-devs/core')

export function loggerDemo() {
  Logger.log('abct', {color: 'red'});
}
```

## API接口

#### log

```typescript
this.logger.log('开始执行..,', 'yellow');
this.logger.log('执行成功', 'green');
```
![Demo](https://img.alicdn.com/imgextra/i3/O1CN01uL8Q5T218ZM3Anfn4_!!6000000006940-2-tps-974-98.png)

打印到输出流，类似console.log效果。可以配置不同颜色显示

#### info | debug | warn | error

```typescript
class LoggerDemo {
  // @ts-ignore
  @Logger('S-CORE') logger: ILogger;
  info() {
    this.logger.info('测试INFO', { context: 'S-CORE' });
  }
  error() {
    this.logger.error('测试ERROR', { context: 'S-CORE' });
  }
  warn() {
    this.logger.warn('测试WARN', { context: 'S-CORE' });
  }
  debug() {
    this.logger.debug('测试DEBUG', { context: 'S-CORE', level: 'debug' });
  }
  debug() {
    this.logger.debug('测试DEBUG LEVEL', { context: 'S-CORE', level: 'error' });
  }
}
const demo = new LoggerDemo();
demo.info();
demo.error();
demo.warn();
demo.debug();
demo.debugLevel();
```
![Demo](https://img.alicdn.com/imgextra/i2/O1CN01dIP3VW1bZsy1YO3oL_!!6000000003480-2-tps-1082-186.png)

可以看到最后的`测试DEBUG LEVEL`没有打印出来，是因为level级别是`error`大于`debug`的级别
