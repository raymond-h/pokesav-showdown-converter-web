var css = require('sheetify')
var choo = require('choo')
const pokesavGba = require('pokesav-gba')
const formatter = require('./formatter')

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
    const save = new pokesavGba.Savefile(file)
    state.output = formatter.output(save.current)
    console.log(state.output)
    emitter.emit('render')
  })
})

app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app