/**
 * GET /onlyLogin
 *
 * only authenticated users will see this page
 */

module.exports = function (fastify, opts, done) {

  fastify.route({
    method: 'GET',
    url: '/onlyLogin',
    preHandler : fastify.checkAuth,
    handler: async (req, reply) => {
      reply.send('Hello authenticated user');
    }
  });

  done();
}
