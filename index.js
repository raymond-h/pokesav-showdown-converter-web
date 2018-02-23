var css = require('sheetify')
var choo = require('choo')
const convert = require('./converter')

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
  state.savefile = null
  state.showdownFile = null

  emitter.on('new-savefile', file => {
    state.savefile = file
    emitter.emit('update-output')
    emitter.emit('render')
  })

  emitter.on('new-showdown-file', file => {
    state.showdownFile = file
    emitter.emit('update-output')
    emitter.emit('render')
  })

  emitter.on('update-output', () => {
    if(state.savefile == null) return

    const result = convert(Buffer.from(state.savefile), state.showdownFile)
    state.output = result.output
    state.trainerCardSignature = result.signature
    console.log(state.output)
  })
})

app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app