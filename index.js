const fs = require('fs')
const qs = require('qs')
const axios = require('axios')
const cheerio = require('cheerio')

/**
 * 获取github趋势页面内容
 * @param {*} url
 */
async function getGithubTrendingContent(url) {
  try {
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    }
    const response = await axios.get(url, { headers })
    const $ = cheerio.load(response.data)
    const repositories = []
    // 查找所有包含仓库信息的Box-row元素
    $('.Box .Box-row').each((index, element) => {
      // 标题
      const title = $(element).find('h2 a').text().replace(/\s\s+/g, ' ').trim()
      // 描述
      const description = $(element)
        .find('.color-fg-muted.my-1')
        .text()
        .replace(/\s\s+/g, ' ')
        .trim()
      // 语言
      const language = $(element).find('.f6.color-fg-muted > span span:nth-child(2)').text().trim()
      // 星数
      const stars = $(element)
        .find('.f6.color-fg-muted a:nth-child(2)')
        .text()
        .trim()
        .replace(/,/g, '')

      // 添加到结果数组
      repositories.push({
        language,
        title,
        description,
        stars,
      })
    })

    // 输出结果
    console.log('提取到的仓库信息:')
    repositories.forEach((repo, index) => {
      console.log(`\n`)
      console.log(`语言: ${repo.language}`)
      console.log(`标题: ${repo.title}`)
      console.log(`描述: ${repo.description}`)
      console.log(`星标: ${repo.stars}`)
    })

    return repositories
  } catch (error) {
    console.error('爬取失败:', error)
  }
}

/**
 * 获取Json内容并提取数据
 * @param {*} url
 */
async function getJsonContent(url) {
  try {
    // 发送HTTP请求获取网页内容
    const response = await axios.get(url)
    console.log('response:', response)
  } catch (error) {
    console.error('爬取失败:', error)
  }
}

/**
 * 主程序
 */
const main = async () => {
  console.log('==================开始执行==================')
  await getGithubTrendingContent('https://github.com/trending?since=daily')
  console.log('==================执行完毕==================')
}

main()
