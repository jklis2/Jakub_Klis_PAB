import { dbmain } from "./DataBase/DbConnection"

const express = require('express')  
const cookieParser = require('cookie-parser')
const user = require('./User/user_controller')
const dostawca = require('./Controllers/dostawcaController')
const producent = require('./Controllers/producentController')
const produkt = require('./Controllers/produktController')

dbmain();

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use('/user', user)
app.use('/dostawca', dostawca)
app.use('/producent', producent)
app.use('/produkt', produkt)

app.listen(500)