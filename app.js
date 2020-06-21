const express=require('express')
const bodyParser=require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const graphql=require('graphql')
const { createServer } = require('http')

const schema=require('./graphql/Schema/schema')

require('dotenv').config()

require('./graphql/db/config')

const app=express()

app.use(bodyParser.json())

const apolloServer = new ApolloServer({
    schema: schema,
    playground: true,
  });

apolloServer.applyMiddleware({ app, path: "/graphql" });

const httpServer = createServer(app);

httpServer.listen({ port: 3000 }, () => {
    console.log(`Apollo Server on http://localhost:${3000}/graphql`);
  });