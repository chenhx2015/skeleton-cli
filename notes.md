### 需要实现哪些基本功能：
注意：业务项目测试使用 npx skeleton-cli

1. 通过 skeleton-cli create <name> 命令启动项目
2. 询问用户需要选择需要下载的模板
3. 远程拉取模板文件（lib 目录下创建一个 http.js 专门处理模板和版本信息的获取）

#### 搭建步骤拆解：

1. 创建项目
2. 创建脚手架启动命令（使用 commander）
3. 询问用户问题获取创建所需信息（使用 inquirer）
4. 下载远程模板（使用 download-git-repo）
5. 发布项目

### 遇到的问题
1.package.json 里面

```js
  "bin": {
    "skeleton-cli": "index.js"
  }
```
遇到问题: 业务项目执行 skeleton-cli 无效
解决：
  先在业务项目里面 yarn add skeleton-cli, 使此项目 .bin 目录下有 skeleton-cli 这个命令；
  然后 npx skeleton-cli 就可以看到效果