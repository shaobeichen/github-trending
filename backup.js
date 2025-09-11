const axios = require('axios')

/**
 * 获取Json内容并提取数据
 * @param {string} url
 */
module.exports.getJsonContent = async url => {
  try {
    // 发送HTTP请求获取网页内容
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('爬取失败:', error)
  }
}
