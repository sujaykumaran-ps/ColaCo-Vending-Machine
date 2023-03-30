import router from './soda.js';
import adminRouter from './admin.js';

export default (app) => {
    app.use('/', router);
    app.use('/', adminRouter);
};