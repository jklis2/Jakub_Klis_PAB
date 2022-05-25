import { dbmain } from "./DataBase/DbConnection"

const express = require('express')  
const user = require('./User/user_controller')
const cookieParser = require('cookie-parser')


dbmain();
const app = express()

app.use(express.json())

app.use(cookieParser())

app.use('/user', user)


app.listen(5000)