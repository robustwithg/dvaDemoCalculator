import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();
// window.dva = app
// 2. Plugins
// app.use({});
window.dva = app
// 3. Model
app.model(require('./models/calculator').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
