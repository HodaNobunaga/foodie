const argon2 = require('argon2') // Documentation: https://www.npmjs.com/package/argon2
const createError = require('http-errors')


async function routes(fastify, options) {
	// #region Create new User
	const optsPost = {
		schema: {
			body: {
				type: 'object',
				properties: {
					email: { type: 'string' },
					firstname: { type: 'string' },
					lastname: { type: 'string' },
					password: { type: 'string' },
				},
				required: ['email', 'password'],
				additionalProperties: false,
			},
		},
	}
	fastify.post('/users', optsPost, async (request, reply) => {
		const { email, password } = request.body // destructuration
		const db = fastify.mongo.db
		const collection = db.collection('users')
		// Vérification si email déjà existant
		const userExists = await collection.findOne({ email })
		if (userExists) throw new createError.Conflict('Email already exists')
		// Hash du mot de passe avant insertion
		const hashedPassword = await argon2.hash(password)
		const result = await collection.insertOne({
			...request.body,
			password: hashedPassword,
			role: 'member',
		})
		return {
			id: result.ops[0]._id,
		}
	})
	// #endregion

	// #region Login User
	const optsLogin = {
		schema: {
			body: {
				type: 'object',
				properties: {
					email: { type: 'string' },
					password: { type: 'string' },
				},
				required: ['email', 'password'],
				additionalProperties: false,
			},
		},
	}
	fastify.post('/login', optsLogin, async (request, reply) => {
		const { email, password } = request.body
		const db = fastify.mongo.db
		const collection = db.collection('users')
		const user = await collection.findOne({ email })
		if (!user) throw new createError.NotFound('Wrong email and/or password')
		// Vérification si le mot de passe correspond avec celui qui est (hashé) en bdd
		const match = await argon2.verify(user.password, password)
		if (!match) throw new createError.NotFound('Wrong email and/or password')
		// On a trouvé l'utilisateur et le mot de passe est bon, on génère un token pour authentifier cet utilisateur et ses futures requêtes
		const token = await reply.jwtSign({
			id: user._id,
			role: user.role,
			expiresIn: '10m',
		})
		// On retourne le token dans notre réponse
		reply.code(200).send({ token })
	})

	// #endregion
}

// const routes = async (fastify, options) => {

// }

module.exports = routes