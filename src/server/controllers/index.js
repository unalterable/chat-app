import { renderToString } from 'react-dom/server';
import App from '../../ui/components/Application.jsx';
import html from '../../ui/layout/basic.js';

module.exports = {
  async showIndex(req, res, next) {
    try {
      const title = 'Chat App';
      const initialState = {};
      const body = renderToString(App(initialState))
      res.send(html({ title, body, initialState }));
    } catch (e) {
      next(e);
    }
  },
}
