// Importation des dépendances
const createError = require('http-errors') // Documentation: https://www.npmjs.com/package/http-errors
const { ObjectId } = require('mongodb')
const { categories } = require('../db')

async function routes(fastify, options) {
	// #region Get All
	fastify.get('/courses', async (request, reply) => {
		const db = fastify.mongo.db
		const collection = db.collection('courses')
		const filters = {...request.query}
		const resultat = await collection.find(filters).toArray()
		console.log(request.query.cuisine)
		return resultat
	})
	// #endregion


	// #region Post New Product
	const opts = {
		schema: {
			body: {
				type: 'object',
				properties: {
					name: { type: 'string' },
					picture: { type: 'string' },
					description: { type: 'string' },
					price: {
						type: 'integer',
						minimum: 0,
						maximum: 100000,
					},
					cuisine: {
						type: 'array',
						minItems: 1,
						maxItems: 6,
						uniqueItems: true,
						items: {
							type: 'string',
							enum: categories
						}
					},
					popular: {
						type: 'boolean',
						default: false,
					},
					rating: {
						type: 'integer',
						nullable: true,
						default: null,
						// minimum: 0,
						// maximum: 5,
					},
					rating_total: {
						type: 'integer',
						default: 0,
					},
					rating_voters: {
						type: 'integer',
						default: 0,
					},
				},
				additionalProperties: false,
				required: ['name', 'description', 'picture', 'price', 'cuisine'],
			}
		}
	}

		//route plus générique mais identique a /courses
	fastify.route({ 
		method : 'POST',
		url : '/courses',
		schema : opts.schema,
		preValidation : fastify.authenticateAdmin,
		handler : async (request, reply) => {
			/**
			 * Grâce à fastify-mongodb, on à accès à notre db via fastify.mongo.db
			 * Cependant, il faudra ensuite préciser la collection à laquelle on souhaite avoir accès via db.collection('nomDeLaCollection')
			 */
			const db = fastify.mongo.db
			const collection = db.collection('courses')
			const result = await collection.insertOne(request.body)
			return result.ops[0]
		}
	 })

	

	//fastify.post('/courses', opts, 
	// #endregion

	// #region Get Product by Id
	fastify.get('/courses/:id', async (request, reply) => {
		// Si je souhaite récupérer la variable id indiqué par l'utilisateur lors de sa requête, je pourrais le faire via l'objet request.params
		const db = fastify.mongo.db
		const collection = db.collection('courses')
	
		const resultat = await collection.findOne({
			_id: new ObjectId(request.params.id)
		})
		console.log(resultat)
		// Si un plat a été trouvé, je le retourne, sinon je renvoie un objet contenant une propriété error à true
		if (resultat === null) {
			// return reply.code(404).send({error: true, message: "Sorry, ressource not found"})
			throw new createError.NotFound()
		}
			return resultat
	})
	// #endregion
	
	// #region Update Product by Id
	const optsPatch = {
		schema: {
			body: {
				...opts.schema.body,
				required: [],
			}
		}
	}
	fastify.patch('/courses/:id', optsPatch, async (request, reply) => {
		// Documentation: http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOneAndUpdate
		const db = fastify.mongo.db
		const collection = db.collection('courses')
		const result = await collection.findOneAndUpdate(
			{ _id: new ObjectId(request.params.id) },
			{ $set: request.body },
			{ returnOriginal: false }
		)
		if (!result.value) {
			throw new createError.NotFound()
		}
		return result.value
	})
	// #endregion

	// #region Delete Product by Id
	fastify.delete('/courses/:id', async (request, reply) => {
		const db = fastify.mongo.db
		const collection = db.collection('courses')
		const resultat = await collection.findOneAndDelete({
			_id: new ObjectId(request.params.id),
		})
		if (!resultat.value) {
			throw new createError.NotFound()
		}
		return resultat.value
	})
	// #endregion
}

module.exports = routes