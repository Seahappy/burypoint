/*
* @Author: Cxy
* @Date: 2021-02-25 14:03:18
 * @LastEditors: Cxy
 * @LastEditTime: 2023-05-15 22:17:25
 * @FilePath: \pnpmft\serve\index.js
*/
const express = require('express')
const app = express()
/* 解析body请求体 */
let bodyParse = require('body-parser')
app.use(bodyParse.json({ extended: false, limit: '50mb' }))
app.use(bodyParse.urlencoded({ extended: true, limit: '50mb' }))

app.get('/login', (req) => {
  console.log(req.query);
})
const multer = require('multer')
const upload = multer().single()
app.post('/login', (req) => {
  console.log(req.query);
})

app.get('/point', (req) => {
  console.log(req.query);
})
app.post('/point', (req, res) => {
  console.log(req.query);
})

const port = 1314
app.listen(port, '0.0.0.0', () => {
  console.log('🌈🌈🌈   服务起来了！！！')
})
