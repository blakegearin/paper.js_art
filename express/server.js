'use strict';

const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/paper/dist')));

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/static/stylesheets/style.css" as="style"><script type="text/javascript" src="/scripts/paper-full.js"></script><script type="text/javascript" src="/static/javascripts/genuary-1-2022.js" canvas="myCanvas"></script></head><body><canvas id="myCanvas"></canvas></body></html>');
  // res.sendFile(__dirname + "../views/genuary-1-2022.html");
  // res.sendFile(path.join(__dirname, "../views/genuary-1-2022.html"));
  // res.sendFile(path.join(__dirname, "../views/genuary-1-2022.html");
  res.end();
});
// router.get('/', (req, res) => res.sendFile(path.join(__dirname, "../views/genuary-1-2022.html")));
router.get('/static/stylesheets/style.css', (req, res) => res.sendFile(path.join(__dirname, '../public/stylesheets/style.css')));
router.get('/static/javascripts/genuary-1-2022.js', (req, res) => res.sendFile(path.join(__dirname, '../public/javascripts/genuary-1-2022.js')));
router.post('/', (req, res) => res.json({ postBody: req.body }));

// router.get('/', (req, res) => {
//   res.sendFile(__dirname + "../views/genuary-1-2022.html");
// });

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);




// 'use strict';

// const express = require('express');
// const app = express();
// const path = require('path');
// const router = express.Router();

// // app.listen(3000, () => {
// //   console.log("Application started and listening on port 3000");
// // });

// app.use('/static', express.static(path.join(__dirname, 'public')));
// app.use('/scripts', express.static(path.join(__dirname, 'node_modules/paper/dist')));

// router.get('/', (req, res) => {
//   res.sendFile(__dirname + "../views/genuary-1-2022.html");
// });

// app.use('/.netlify/functions/server', router);  // path must route to lambda
// app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

// module.exports = app;
// module.exports.handler = serverless(app);
