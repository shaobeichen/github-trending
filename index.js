import { actions } from './api'
import { saveToFile } from './save'

/**
 * 主程序
 */
const main = async () => {
  console.log('===== 开始执行 =====')
  const json = {}
  for (let i = 0; i < actions.length; i++) {
    const [elementFunction, elementKey] = actions[i]
    console.log(`开始执行第${i + 1}个任务，共${actions.length}个任务`)
    const result = await elementFunction()
    json[elementKey] = result
  }
  await saveToFile(json)
  console.log('===== 执行完毕 =====')
}

main()
