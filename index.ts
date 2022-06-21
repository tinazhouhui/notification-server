'use strict';

import express from 'express';
import router from './router';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // json body parser
app.use(router); // apply router

app.listen(PORT, () => {  // initialize server
	console.log(`I am up and running at http://localhost:${PORT}`);
});
