
var _ = require('lodash')
  , BaseManager = require('manager')

  , utils = require('./utils')

module.exports = Manager

function newId(ln) {
  var chars = 'abcdef01245689'
    , id = ''
  ln = ln || 8
  for (var i=0; i<chars.length; i++) {
    id += chars[parseInt(chars.length * Math.random())]
  }
  return id
}

function Manager(data) {
  BaseManager.call(this)
  if (data) this.dump(data)
}

Manager.prototype = _.extend(BaseManager.prototype, {
  defaultNode: {
    children: [],
    data: {text: ''},
    type: 'normal',
    tags: []
  },
  genId: newId.bind(null, 16),
  dump: function (data) {
    var map = utils.toMap(data)
    for (var id in map) {
      this.got(id, map[id])
    }
  },
})

