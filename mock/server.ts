import jsonServer from 'json-server'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
const authMock = require('./auth')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))

server.post('/login', (req, res) => {
  const { email, password } = req.body
  const db = router.db
  const user = db.get('users').find({ email, password }).value()
  if (user) {
    res.jsonp({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      token: 'mock-token-' + user.id,
    })
  } else {
    res.status(401).jsonp({ error: 'Invalid email or password' })
  }
})

server.use(express.json())
server.use(authMock)
server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001')
})
