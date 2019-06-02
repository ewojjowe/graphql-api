// NPM packages
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')

// Resolvers
const resolver = require('./graphql/resolver')

// Schema
const schema = require('./graphql/schema')

// express app
const app = express()

// env variables
const {
	PORT,
	HOST,
	USERNAME,
	PASSWORD,
	CLUSTER,
	DB_NAME
} = process.env

// parse req body to json data
app.use(bodyParser.json())

// set up database connection
mongoose.connect(
	`mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`,
	{useNewUrlParser: true}
).then(() => {
	console.log(`Connected to Database ${DB_NAME}`)
}).catch((err) => {
	console.log('Error: ', err)
})

// graphql endpoint
app.use('/graphql', graphqlHTTP({
	schema,
	rootValue: resolver,
	graphiql: true
}))

// listineng server
app.listen(PORT, () => {
	console.log(`Server running at http://${HOST}:${PORT}`)
})
