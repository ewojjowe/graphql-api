require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')

const graphQlResolver = require('./graphql/resolver')
const graphQlSchema = require('./graphql/schema')

const isAuth = require('./middleware/isAuth')

const app = express()

const {
	PORT,
	HOST,
	USERNAME,
	PASSWORD,
	CLUSTER,
	DB_NAME
} = process.env

app.use(bodyParser.json())

mongoose.connect(
	`mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`,
	{useNewUrlParser: true}
).then(() => {
	console.log(`Connected to Database ${DB_NAME}`)
}).catch((err) => {
	console.log('Error: ', err)
})

app.use(isAuth)

app.use('/graphql', graphqlHTTP({
	schema: graphQlSchema,
	rootValue: graphQlResolver,
	graphiql: true
}))

app.listen(PORT, () => {
	console.log(`Server running at http://${HOST}:${PORT}`)
})
