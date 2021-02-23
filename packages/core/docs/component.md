# Component

## 使用

decorator使用方式(推荐)

```typescript
const {Component, IComponent} = require('@serverless-devs/core')

class ComponentDemo {
  @HComponent() component: IComponent;

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

#### args
命令行参数解析工具，用于解析命令行参数。格式为 args(Input, options)
解析工具采用minimist(https://github.com/substack/minimist) 详细使用查看文档
```typescript
this.component.args({
  args: '-x 3 -y 4 -n5 -abc --beep=boop foo bar baz',
});
```
返回数据
```js
{
  rawData: '-x 3 -y 4 -n5 -abc --beep=boop foo bar baz',
  data: {
    _: [ 'foo', 'bar', 'baz' ],
    x: 3,
    y: 4,
    n: 5,
    a: true,
    b: true,
    c: true,
    beep: 'boop'
  }
}
```

#### options解析
- opts.string
  始终视为字符串的字符串或字符串数组参数名称
- opts.boolean
   始终视为布尔值的布尔值，字符串或字符串数组。如果为true，则将所有不带等号的双连字符连字符视为布尔值（例如，影响--foo，而不是-f或--foo = bar）

#### help
```typescript
const sections = [
  {
    header: 'A typical app',
    content: 'Generates something {italic very} important.',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'input',
        typeLabel: '{underline file}',
        description: 'The input to process.',
      },
      {
        name: 'help',
        description: 'Print this usage guide.',
      },
    ],
  },
  {
    header: 'Examples',
    content: [
      {
        desc: '1. A concise example. ',
        example: '$ example -t 100 lib/*.js',
      },
      {
        desc: '2. A long example. ',
        example: '$ example --timeout 100 --src lib/*.js',
      },
      {
        desc: '3. This example will scan space for unknown things. Take cure when scanning space, it could take some time. ',
        example: '$ example --src galaxy1.facts galaxy1.facts galaxy2.facts galaxy3.facts galaxy4.facts galaxy5.facts',
      },
    ],
  },
];
this.component.help(sections);
```
返回数据
```

A typical app

  Generates something very important. 

Options

  --input file    The input to process.   
  --help string   Print this usage guide. 

Examples

  1. A concise example.                                                                    $ example -t 100 lib/*.js                                                              
  2. A long example.                                                                       $ example --timeout 100 --src lib/*.js                                                 
  3. This example will scan space for unknown things. Take cure when scanning space, it    $ example --src galaxy1.facts galaxy1.facts galaxy2.facts galaxy3.facts galaxy4.facts  
  could take some time.          
```
help方法来自command-line-usage
具体API使用请移步 https://github.com/75lb/command-line-usage
