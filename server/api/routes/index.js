// Importing task, archive and trash files to index file

import router from './soda.js';

export default (app) => {
    app.use('/', router);

};