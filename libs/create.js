const path = require('path')
const fs = require('fs-extra')

// 询问之后，创建目录
// 需要思考：是否已经存在？是否需要强制覆盖？
// 如果存在
// 当 { force: true } 时，直接移除原来的目录，直接创建
// 当 { force: false } 时 询问用户是否需要覆盖
// 如果不存在，直接创建

module.exports = async function (name, options) {
  // 验证是否正常取到值
  console.log('>>> create.js', name, options) // 打印出来 appdemo { force: true }

  // 执行创建命令

  // 当前命令行选择的目录
  const cwd  = process.cwd();
  // 需要创建的目录地址
  const targetAir  = path.join(cwd, name)

  // 目录是否已经存在？
  if (fs.existsSync(targetAir)) {

    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetAir)
    } else {
      // TODO：询问用户是否确定要覆盖
    }
  }
}