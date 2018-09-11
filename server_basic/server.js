const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({type:'*/*'}))

app.get('/',(reg,res)=>{
    res.send('Main Page')
})

app.get('/signin',(reg,res)=>{
    res.send('SignIn Page')
})

app.get('/signup',(reg,res)=>{
    res.send('signUp Page')
})

app.post('/order',(reg,res)=>{
    console.log(reg.body)
    res.json({status:'ok'})
})

app.listen(8000,()=>{
    console.log('ready on http://localhost:8000')
})
