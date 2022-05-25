import { dbmain } from "./DataBase/DbConnection"

const express = require('express')  
const cookieParser = require('cookie-parser')


dbmain();
const app = express()

app.use(express.json())

app.use(cookieParser())

app.listen(5000)