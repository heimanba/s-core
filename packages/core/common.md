## request

#### 用于统一HTTP网络请求。加上loading效果

```typescript
function test_request_hint() {
  request('https://api.github.com/users/octocat', {
    method: 'get',
    data: {
      tag: 'fc',
      error: 'error',
    },
    hint: {
      loading: '数据请求中...',
      success: '数据请求成功',
      error: '数据请求失败',
    },
  });
}
```

![Demo](https://img.alicdn.com/imgextra/i4/O1CN015PTSmc1Kq3TybwnpK_!!6000000001214-1-tps-729-61.gif)

## downloadRequest

#### 用于统一下载的方法，会自动带上下载进度条

```typescript
/**
 * url: 远程下载的链接
 * outDir: 下载存放的路径
 * { 
 *  extract: true // 是否执行解压操作
 *  strip: 1 // 文件提取目录级别
 * }
 */
downloadRequest(url, outDir, {extract: true, strip: 1})
```

![Demo](https://img.alicdn.com/imgextra/i2/O1CN018yjxKC1XdJTAffXBY_!!6000000002946-1-tps-729-61.gif)

## report

#### 组件上报

```typescript
async function component() {
  await report('组件数据上报', {
    type: 'component',
    context: 'fc',
    params: {
      action: 'deploy',
      account: '123435',
    },
  });
  this.logger.info('成功上报');
}
```

#### 错误上报

```typescript
async function error() {
  await report('错误上报', {
    type: 'error',
    context: 'fc',
  });
  this.logger.error('错误上报');
}
```


