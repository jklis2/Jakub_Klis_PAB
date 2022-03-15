const express = require('express')  
const app = express()  
app.get('/', function (req, res) {  
  const num1 = +req.query.num1
  const num2 = +req.query.num2
  const operation = req.query.operation;
})  
app.listen(3000)  

// localhost:3000?num1=4&num2=5&op=add