async function routes(fastify, options) {
	// Lors de l'évènement 'onRequest' (à chaque nouvelle requête sur les routes de ce fichier), la méthode fastify.authenticate sera éxécutée 
	// On peut utiliser fastify.authenticate car on l'a définie en tant que 'decorateur'
	fastify.addHook('onRequest', fastify.authenticate)

	fastify.get('/private', async (request, reply) => {
		return "You are authenticated"
	})
}

module.exports = routes