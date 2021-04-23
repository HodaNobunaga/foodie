// Fichier utile pour déclarer nos futurs
// async function authenticateJWT(request, reply) {
// 	fastify.jwt.verify(request.query.token)
// 	console.log(request.query.token)
// 	return true
// }

// module.exports = {
// 	authenticateJWT
// }

// verifier si le user est admin ou non

async function authenticateAdmin(request, reply){
  try{
    const decoded = await request.jwtVerify()
    if(decoded.role !== "admin"){
        throw new Error("Unauthorized")
    } 
    return decoded
  }catch(error){
      reply.code(500).send(error)
  }
}

module.exports = {
    authenticateAdmin
}