const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb')
const app = express()

const uri = 'mongodb+srv://tbuivdev:Zxcasdqwe12@learning-manager.swd6ctg.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
})

const connectDB = async () => {
	try {
		await client.connect()
		console.log('Mongo DB connected')
	} catch (e) {
		console.log(e)
		process.exit(1)
	}
}

connectDB()
app.get('/', (req, res) => res.send('Hello World'))
const PORT = 3456

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
