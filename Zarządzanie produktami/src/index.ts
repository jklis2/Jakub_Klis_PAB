import { dbmain } from "./DataBase/DbConnection"

const express = require('express')  
const cookieParser = require('cookie-parser')
const user = require('./User/user_controller')
const dostawca = require('./Controllers/dostawcaController')
const producent = require('./Controllers/producentController')

dbmain();
const app = express()

app.use(express.json())

app.use(cookieParser())

app.use('/user', user)
app.use('/dostawca', dostawca)
app.use('/producent', producent)


app.listen(500)