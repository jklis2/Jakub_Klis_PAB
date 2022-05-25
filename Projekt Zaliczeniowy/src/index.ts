import { dbmain } from "./DataBase/DbConnection"

const express = require('express')  
const user = require('./User/user_controller')
const cookieParser = require('cookie-parser')
const producent = require('./Controllers/producentController')
const dostawca = require('./Controllers/dostawcaController')
const kategoria = require('./Controllers/kategoriaController')

dbmain();
const app = express()

app.use(express.json())

app.use(cookieParser())

app.use('/user', user)
app.use('/producent', producent)
app.use('/dostawca', dostawca)
app.use('/kategoria', kategoria)

app.listen(5000)