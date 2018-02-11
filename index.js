var css = require('sheetify')
var choo = require('choo')
const converterGba = require('./converter-gba')

function convert(file) {
  return converterGba.convert(file)
}

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-reload')())
  app.use(require('choo-devtools')())
  app.use(require('choo-log')())
}
app.use(require('choo-service-worker')())

app.use(function filesStore(state, emitter) {
  state.output = 'output\ngoes\nhere'

  emitter.on('new-savefile', file => {
    state.output = convert(file)
    console.log(state.output)
    emitter.emit('render')
  })
})

app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app