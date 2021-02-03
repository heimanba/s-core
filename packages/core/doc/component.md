# Component

## 使用

decorator使用方式(推荐)

```typescript
const {Component} = require('@serverless-devs/core/decorator')

class ComponentDemo {
  @Component() component;

  async deploy() {
    await this.component.load('fc', 'alibaba');
  }
}
```

## API接口

#### load
用于加载组件,组件会下载到 ~/.s/components 目录下面。
```typescript
this.component.load('fc', 'alibaba');
```

支持下载特定版本的组件使用方式为

```typescript
this.component.load('fc@0.1.2', 'alibaba');
```
