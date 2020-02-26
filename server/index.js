require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools')
const mongoose = require('mongoose');
const resolvers = require('./resolvers');
const AuthDirective = require('./resolvers/Directives/AuthDirective');
const verifyToken = require('./utils/verifyToken');


async function start() {
	const typeDefs = await importSchema(__dirname + '/schema.graphql');

	const MONGO_URI = process.env.MONGO_URI;
    
	mongoose.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex:true
	});

	const mongo = mongoose.connection;

	mongo
		.on('error', error => console.log(error))
		.once('open', () => console.log('Connected to database'));

	const schema = makeExecutableSchema({
		typeDefs,
		resolvers,
		schemaDirectives:{
			auth:AuthDirective
		}
	})

	const server = new ApolloServer({ 
		schema,
		context: ({req}) => verifyToken(req)
	});

	server.listen().then(({ url }) => {
		console.log(`Server ready set: ${url}`);
	});
}

start();