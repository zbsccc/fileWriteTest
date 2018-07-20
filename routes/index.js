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
  const path = 'public/files/data.json';

  const status = await FILE.addData(path, data).catch(e => {
    console.error(e);
    return '存储失败'
  })
  console.log(status)
  
  ctx.body = status
})
module.exports = router
