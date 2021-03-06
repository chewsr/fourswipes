import {jsdom} from 'jsdom'

export default (markup) => {
  if (typeof document !== 'undefined') return

  global.document = jsdom(markup || '<html><body></body></html>')
  global.window = document.defaultView
  global.navigator = {userAgent: 'node.js'}
}
