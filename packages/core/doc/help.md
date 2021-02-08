## help

#### 使用方法
```typescript
const commandLineUsage = require('command-line-usage')

const sections = [
  {
    header: 'A typical app',
    content: 'Generates something {italic very} important.'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'input',
        typeLabel: '{underline file}',
        description: 'The input to process.'
      },
      {
        name: 'help',
        description: 'Print this usage guide.'
      }
    ]
  }
]
const usage = commandLineUsage(sections)
console.log(usage)
```
![Demo](https://raw.githubusercontent.com/75lb/command-line-usage/master/example/screens/synopsis.png)

#### 详情
help方法来自 `command-line-usage`
详细使用参考 https://github.com/75lb/command-line-usage#commandlineusagesections--string-

