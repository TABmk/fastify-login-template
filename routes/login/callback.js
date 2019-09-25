/**
 * GET /login/callback
 */

module.exports = function (fastify, opts, done) {

  fastify.get('/callback', async (req, reply) => {
    if (req.query && !req.query.error) {
      let user = await fastify.getAccessTokenFromAuthorizationCodeFlow(req);

      req.session.authenticated = true;
      req.session.user = user;
    }

    reply.redirect('/');
  });

  done();
}
