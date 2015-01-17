var Nudger = require('./nudger')
var pkg = require('../package.json')

var DEFAULT_PATHNAME = '/nudge'
var DEFAULT_INTERVAL = 60e3

exports.register = register

register.attributes = {
    pkg: pkg,
}

function register(server, options, next) {
    var pathname = options.pathname || DEFAULT_PATHNAME
    var nudger = Nudger.create({
        hostname: options.hostname || server.info.host,
        pathname: pathname,
        port: options.port || server.info.port,
        protocol: options.protocol || server.info.protocol,
        interval: options.interval || DEFAULT_INTERVAL,
    })
    server.route({
        path: pathname,
        method: 'GET',
        config: {
            handler: function (request, reply) {
                return reply({
                    uptime: process.uptime(),
                })
            },
        },
    })
    server.on('start', nudger.nudge.bind(nudger))
    return next()
}
