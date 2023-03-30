import app from './api/app.js';

// Assigning port value as 3001
const port = 3001;

// Listening to port 3001
app.listen(port, () => {
    console.log(`ColaCo vending machine app listening at http://localhost:${port}`)
});
