const express=require('express')
const bodyParser=require('body-parser')
const graphqlHTTP=require('express-graphql')
const graphql=require('graphql')

const schema=require('./graphql/Schema/schema')


const app=express()

app.use(bodyParser.json())

app.get('/',(req,res,next)=>{
    res.send("Welcome To Graph API")
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(3000)