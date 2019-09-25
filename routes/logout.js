/**
 * GET /logout
 */

module.exports = function (fastify, opts, done) {

  fastify.get('/logout', async (req, reply) => {
    if (req.session.authenticated) {
      req.destroySession(err => {
        if (err) {
          reply.status(500);
          reply.send('Internal Server Error');
        } else {
          reply.redirect('/');
        }
      });
    } else {
      reply.redirect('/');
    }
  });

  done();
}
