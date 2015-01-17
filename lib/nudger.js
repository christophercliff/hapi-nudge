var _ = require('lodash')
var assert = require('assert')
var url = require('url')
var Wreck = require('wreck')

module.exports = Self

function Self(options) {
    assert(_.isString(options.hostname))
    assert(_.isString(options.pathname))
    assert(_.isNumber(options.port))
    assert(_.contains(['http', 'https'], options.protocol))
    assert(_.isNumber(options.interval))
    this.interval = options.interval
    this.url = url.format(options)
}

_.extend(Self.prototype, {

    nudge: function () {
        Wreck.get(this.url, function (err) {
            if (err) throw err
            setTimeout(this.nudge.bind(this), this.interval)
        }.bind(this))
    },

})

_.extend(Self, {

    create: function (options) {
        return new Self(options)
    },

})
