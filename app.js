const express = require('express')
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')



mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("mongo err",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routs/auth'))
app.use(require('./routs/post'))
app.use(require('./routs/user'))


app.listen(PORT,()=>{
    console.log("server is running on", PORT)
})