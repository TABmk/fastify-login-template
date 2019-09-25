/**
 * GET /onlyLogin
 *
 * only authenticated users will see this page
 */

module.exports = function (fastify, opts, done) {

  let checkAuth = (req, reply, next) => {
    if (!req.session || !req.session.authenticated) {
      reply.code(401);
      reply.send({error : 'Auth required'});
    }
    next();
  }

  fastify.decorate('checkAuth', checkAuth)

  done();
}

module.exports[Symbol.for('skip-override')] = true;
