/**
 * GET /
 */

module.exports = function (fastify, opts, done) {

  fastify.get('/', async (req, reply) => {
    reply.send(req.session);
  });

  done();
}

module.exports.prefixOverride = '/'
