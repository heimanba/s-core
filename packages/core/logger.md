# Logger

## 功能

1. 打印到输出流

- 类似console.log,通过输出流打印到屏幕上。支持输出不同颜色：'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | '
  gray'
- 输出spinner类似loading的效果
- 输出类似progressBar的进度条效果

2. 输出logger日志信息 输出日志级别为：debug,info,warn,error等。

3. 状态上报 上报错误数据或者用户状态数据

## 使用

decorator使用方式(推荐)

```typescript
const {Logger, ILogger} = require('@serverless-devs/s-core/decorator')

class LoggerDemo {
  @Logger("CONTEXT") logger: ILogger;

  getLog() {
    this.logger.log('abct', {color: 'red'});
  }
}
```

类使用方式(在纯函数中)

```typescript
const {Logger, ILogger} = require('@serverless-devs/s-core')

export function loggerDemo() {
  Logger.log('abct', {color: 'red'});
}
```

## API接口

#### log

```typescript
this.logger.log(message, {
  color: 'blue'
})
```

打印到输出流，类似console.log效果。可以配置不同颜色显示

#### spinner

```typescript
spinner: ("加载中..", {status:'start'})
```

log前面加上spinner动效，一般用于动态加载数据时候loading。大概分为两类状态

1. 过程态(状态正在进行中)

- `this.logger.spinner("数据加载中...", {status:'start'})`
  spinner开始执行
- `this.logger.spinner("数据加载中...", {status:'spinning',spinning: {color:'red' } })`
  spinner正在进行中，可以动态的改变颜色和提示文字

2. 终态(状态结束)

- stop 状态强制结束
- success 停止spinning，显示成功`✔`标识
- error 停止spinning，显示失败`✖`标识
- warn 停止spinning，显示警告`⚠ `标识
- info 停止spinning，显示info `ℹ`的标识

#### progress

使用

```typescript
// 开始progress进度条
logger.progress('downloading', {
  size: 1000,
  status: 'start'
})
// 执行progress进度条
const timer = setInterval(function () {
  const bar = logger.progress('downloading', {
    size: 10,
    status: 'tick'
  });
  if (bar.complete) {
    clearInterval(timer);
  }
}, 1000);
```

#### info | debug | warn | error

```typescript
this.logger.info("测试", {
  context: "S-CORE"
})
// 输出

// level 测试
this.logger.info("测试", {
  context: "S-CORE",
  level: "debug"
})
```

#### report

- 用于上报错误组件状态

```typescript
this.logger.report("message", {
  message: "请求失败",
  context: "fc" // 组件名
})
```

- 组件数据上报

```typescript
this.logger.report("message", {
  message: "xxx",
  context: "fc",
  action: 'deploy',
  account: '123435',
});
```


