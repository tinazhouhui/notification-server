'use strict';

const PORT = process.env.PORT || 5000;
import app from './app/app';

app.listen(PORT, () => {  // initialize server
	console.log(`I am up and running at http://localhost:${PORT}`);
});
