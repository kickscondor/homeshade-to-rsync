var chalk = require('chalk')
var spawn = require('hexo-util/lib/spawn')
var pathFn = require('path')
var url = require('url')

module.exports = function (src, opts, fn) {
  if (!opts.destination) {
    return fn(new Error('The rsync output needs a destination.'))
  }

  if (!opts.hasOwnProperty('delete')) opts.delete = true
  if (!opts.hasOwnProperty('verbose')) opts.verbose = true
  if (!opts.hasOwnProperty('ignore_errors')) opts.ignore_errors = false

  var uri = url.parse(opts.destination)
  var params = [
    '-az',
    (process.platform === 'win32' ? pathFn.basename(src) : src) + '/',
    (uri.username ? uri.username + '@' : '') + uri.hostname + ':' + uri.pathname
  ]

  if (uri.port && uri.port > 0 && uri.port < 65536) {
    params.splice(params.length - 2, 0, '-e')
    params.splice(params.length - 2, 0, 'ssh -p ' + uri.port)
  }

  if (opts.verbose) params.unshift('-v')
  if (opts.ignore_errors) params.unshift('--ignore-errors')
  if (opts.delete) params.unshift('--delete')
  if (opts.opts) params.unshift(opts.opts)

  return spawn('rsync', params, {verbose: true}).then(output => {
    fn(null, true)
  })
}
