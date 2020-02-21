const {ApolloServer, gql} = require('apollo-server')
const { importSchema } = require('graphql-import')
const mongoose = require('mongoose')
const resolvers = require('./resolvers')

async function start(){
    const typeDefs = await importSchema(__dirname+'/schema.graphql')

    const MONGO_URI = 'mongodb+srv://PabloRam:Datrebil!9@cluster0-om8iy.mongodb.net/b38?retryWrites=true&w=majority'

    mongoose.connect(MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const mongo = mongoose.connection;
    mongo.on('error', error => console.log(error))
        .once('open', () => console.log('Connected to DB'))


    const server = new ApolloServer({typeDefs, resolvers})

    server.listen().then(({url}) => {
        console.log(`server ready set: ${url}`)
    })

}

start();
