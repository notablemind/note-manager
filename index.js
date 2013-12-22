
var _ = require('lodash')
  , Manager = require('manager')

  , utils = require('./utils')

module.exports = function (base, data) {
  var args = []
  if (arguments.length < 2) {
    data = base
    base = Manager
  } else if (arguments.length > 2) {
    args = [].slice.call(arguments, 1, -1)
    data = arguments[arguments.length - 1]
  }
  args.push({
    genId: newId.bind(null, 16),
    defaultNode: {
      children: [],
      data: {text: ''},
      type: 'normal',
      tags: []
    },
  })
  var f = base.bind.apply(base, [null].concat(args))
  var m = new f()
  utils.dump(m, data)
  m.dump = function (data) {
    utils.dump(m, data)
  }
  return m
}

function newId(ln) {
  var chars = 'abcdef01245689'
    , id = ''
  ln = ln || 8
  for (var i=0; i<chars.length; i++) {
    id += chars[parseInt(chars.length * Math.random())]
  }
  return id
}

