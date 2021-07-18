const cron = require('node-cron');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const httpContext = require('express-http-context');
const marked = require('marked');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const config = require('./config/auth.config');
const logger = require('./services/logger')(module);

const authRouter = require('./routes/auth.routes');
const companiesRouter = require('./routes/companies.routes');
const contactsRouter = require('./routes/contacts.routes');

const app = express();

app.use(httpContext.middleware);
app.use((req, res, next) => {
  httpContext.ns.bindEmitter(req);
  httpContext.ns.bindEmitter(res);
  httpContext.set('method', req?.method);
  httpContext.set('url', req?.url);
  next();
});

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Documentation for api-js-backend',
    },
    servers: [
      {
        url: 'http://localhost:8087',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

app.use(cors());

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use('/auth', authRouter);
app.use('/companies', companiesRouter);
app.use('/contacts', contactsRouter);

// const db = require('./models');

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Db');
// });

app.get('/', (req, res) => {
  const path = `${__dirname}/README.md`;
  const file = fs.readFileSync(path, 'utf8');
  const pageContent = marked(file.toString());

  res.send(
    `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="github-markdown.css">
      </head>
      <body>
        <article class="markdown-body">${pageContent}</article>
      </body>
    </html>
    `,
  );
});

cron.schedule('0 * * * *', () => {
  fs.rm('./public/images/', { recursive: true, force: true }, (err) => {
    if (err) logger(err);
  });
});

async function start() {
  try {
    app.listen(config.port, () => {
      logger.info(`App has been started on port ${config.port}...`);
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
}

start();

module.exports = app;
