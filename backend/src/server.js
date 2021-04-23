// Require the framework and instantiate it
const fastify = require('fastify')({ logger: { prettyPrint: true } })
require('dotenv').config()

const { authenticateAdmin } = require('./decorators')

/*
	Pour se connecter à notre base de données (bdd) mongodb, on doit utiliser une bibliothèque appelée fastify-mongodb.
	Pour l'installer, il faudra écrire: npm install fastify-mongodb
	Ensuite, il faudra enregistrer notre connection avec le bloc ci-dessous:
*/

// Définition de la librairies JWT
// Documentation: https://jwt.io
// Documentation: https://www.npmjs.com/package/fastify-jwt
fastify.register(require('fastify-jwt'), {
  secret: process.env.SECRET
})


// Autorisation du port 3000(React) à se connecter
fastify.register(require('fastify-cors'), {
  origin: "*"
})

// On définit une fonction qui nous servira ensuite dans nos différentes routes
async function authenticateJWT(request, reply) {
	try {
		//const decoded = fastify.jwt.verify(request.query.token)
		const decoded = await request.jwtVerify()
		//cette methode va vérifier si un token est présent dans le header
		//si aucun token n'est présent ou que ce token est invalide alors on retourne une erreur 500
		//Header "Bearer token"
		return decoded
	} catch (error) {
		reply.code(500).send(error)
	}
}

// Decorateurs - ceci aura pour effet d'ajouter à notre objet fastify la méthode authenticate qui correspondra à notre fonction authenticateJWT
fastify.decorate('authenticate', authenticateJWT)
fastify.decorate('authenticateAdmin', authenticateAdmin)

// Connection to Database
fastify.register(require('fastify-mongodb'), {
	// Documentation: https://www.fastify.io/docs/latest/Getting-Started/#your-first-plugin
	// Documentation: https://www.npmjs.com/package/fastify-mongodb
	// Documentation: https://docs.mongodb.com/manual/crud/
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  url: 'mongodb://localhost:27017/restaurant-api'
	// Si la collection n'existe pas, elle sera automatiquement créé dès l'insertion du premier document.
})

// Importation des routes
fastify.register(require('./routes/courses'))
fastify.register(require('./routes/users'))
fastify.register(require('./routes/private'))
//fastify.register(require('./routes/american'))


// Declare a route
fastify.get('/', async (request, reply) => {
	return { hello: 'world' }
})

// Déclarer une nouvelle route "/test" qui va renvoyer comme chaine de caractère "Ceci est un message test venant du serveur"
fastify.get('/test', async (request, reply) => {
	return 'Ceci est un message test venant du serveur'
})

// Exemple de déclaration de route
fastify.get('/me', async (request, reply) => {
	const me = {
		id: 1,
		firstname: 'Tony',
		lastname: 'Stark',
		email: 'tony@stark.com',
	}
	return me
})

// Run the server!
const start = async () => {
	try {
		await fastify.listen(4000)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}
start()

// CRUD - Create (POST) - Read (GET) - Update (PATCH / PUT) - Delete (DELETE)
