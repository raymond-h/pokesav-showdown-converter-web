const React = require('react')
const ReactDOM = require('react-dom')
require('tachyons')

const App = require('./src/App').default
const convert = require('./converter')

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
