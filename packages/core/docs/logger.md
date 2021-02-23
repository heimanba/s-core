# Logger

## 使用

decorator使用方式(推荐)

```typescript
const {HLogger} = require('@serverless-devs/core')

class LoggerDemo {
  @HLogger("S-CORE") logger:ILogger;

  getLog() {
    this.logger.log('abct', {color: 'red'});
  }
}
```

类使用方式(在纯函数中)

```typescript
const {Logger} = require('@serverless-devs/core')

// Logger类
export function loggerDemo() {
  Logger.log('abct', "red");
  Logger.info('S-CORE', "dankunTest");
}
```

#### context

用在log日志中，代表现在处于哪种环境变量中。

```typescript
const {HLogger, Logger} = require('@serverless-devs/core')

class LoggerDemo {
  @HLogger("S-CORE") logger:ILogger;

  getinfo() {
    this.logger.info('abc');
  }
}

// 或者
Logger.info('abc', {context: 'S-CORE'})
```

![Demo](https://img.alicdn.com/imgextra/i2/O1CN01TSrTX01YZ1NAB8B56_!!6000000003072-2-tps-1376-102.png)

#### logLevel

打印最小级别logger,默认是info 级别。日志级别为 debug,info,warn,error

1. 通过程序控制
```typescript
const {HLogger, Logger} = require('@serverless-devs/core')

class LoggerDemo {
  @HLogger("S-CORE", 'info') logger:ILogger;

  getDebugMsg() {
    this.logger.debug('debug message');
  }

  getInfoMsg() {
    this.logger.info('info message');
  }
}

// 或者
Logger.info('abc', {context: 'S-CORE', logLevel: 'info'})
```
效果可以看到值打印出 info级别的
![demo](https://img.alicdn.com/imgextra/i2/O1CN01wrveE41EL0weezXMS_!!6000000000334-2-tps-1270-98.png)

2. 通过  --debug 开启debug
```typescript
class LoggerDemo {
  @HLogger('S-CORE') logger:ILogger;

  getDebugMsg() {
    this.logger.debug('debug message');
  }

  getInfoMsg() {
    this.logger.info('info message');
  }
}
```
![demo](https://img.alicdn.com/imgextra/i3/O1CN019Osu63223orgTmO8r_!!6000000007065-2-tps-1168-154.png)
可以看到默认把debug日志打印出来了

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
  @HLogger('S-CORE') logger:ILogger**;

  info() {
    this.logger.info('测试INFO', {context: 'S-CORE'});
  }

  error() {
    this.logger.error('测试ERROR', {context: 'S-CORE'});
  }

  warn() {
    this.logger.warn('测试WARN', {context: 'S-CORE'});
  }

  debug() {
    this.logger.debug('测试DEBUG', {context: 'S-CORE', logLevel: 'debug'});
  }

  debug() {
    this.logger.debug('测试DEBUG logLevel', {context: 'S-CORE', logLevel: 'error'});
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

可以看到最后的`测试DEBUG logLevel`没有打印出来，是因为level级别是`error`大于`debug`的级别
