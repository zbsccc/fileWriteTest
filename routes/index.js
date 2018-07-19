const router = require('koa-router')()
const moment = require('moment')
const FILE = require('../models/file.model')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Add'
  })
})


router.post('/add', async (ctx, next) => {
  const data = {
    content: ctx.request.body.content,
    time: moment().format('YYYY-MM-DD HH:mm:ss')
  }

	// 读取原数据
  let fileData = await FILE.readFile('public/files/data.json').catch(e => {
    console.log(e);
    return null
  })

  // 如果文件不存在
  if(!fileData){
    ctx.body = '文件不存在';
    return
  }

  // 如果文件长度 < 10，写入一条新数据
  if(fileData.length < 10){
    fileData.push(data);
		const newFile = JSON.stringify(fileData);
		
		const result = await FILE.writeFile('public/files/data.json', newFile).catch(e => {
			console.error(e);
			return -1
		})
		console.log(result)
		
		if(result === 1){
			ctx.body = '数据保存成功'
		}
		else{
			ctx.body = '数据存储失败'
		}
  }
  else{
    ctx.body = '最多只能保存10条记录'
  }
})
module.exports = router
