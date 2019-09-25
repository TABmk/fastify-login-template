/**
 * handle non-existing routes and redirect em to /
 */

module.exports = function (fastify, opts, done) {

  fastify.get('*', async (req, reply) => {
    reply.redirect('/');
  });

  done();
}
