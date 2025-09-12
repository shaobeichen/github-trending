const fs = require('fs')
const dayjs = require('dayjs')

/**
 * 保存数据到文件
 * @param {object} json
 */
const saveToFile = async json => {
  const dirName = dayjs().format('YYYY-MM-DD')
  const path = await fs.readdirSync('./')

  if (!path.includes('archive')) await fs.mkdirSync('./archive')

  // 单个json
  const filename = `./archive/${dirName}.json`
  if (!fs.readdirSync('./archive').includes(`${dirName}.json`)) {
    await fs.writeFileSync(filename, JSON.stringify(json))
  }

  // 归总json
  const cdnBase = 'https://cdn.jsdelivr.net/gh/shaobeichen/github-trending@main/archive'
  const cdnUrl = `${cdnBase}/${dirName}.json`
  if (!path.includes('total.json')) await fs.writeFileSync('./total.json', JSON.stringify({ urls: [] }))
  const data = await fs.readFileSync('./total.json', 'utf-8')
  const parseData = JSON.parse(data)
  const [first] = parseData.urls
  if (!first || (first && !first.includes(dirName))) {
    parseData.urls.unshift(cdnUrl)
    await fs.writeFileSync('./total.json', JSON.stringify(parseData))
  }
}

module.exports = {
  saveToFile,
}
