const express = require('express');
const pino = require('pino');
const client = require('prom-client');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

const register = client.register;
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method','route','status']
});
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Request duration in seconds',
  labelNames: ['method','route','status'],
  buckets: [0.005,0.01,0.05,0.1,0.5,1,2,5]
});

const app = express();

app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    const route = (req.route && req.route.path) || req.path;
    httpRequestCounter.inc({ method: req.method, route, status: res.statusCode });
    end({ method: req.method, route, status: res.statusCode });
    logger.info({ method: req.method, route, status: res.statusCode, url: req.url }, 'request_finished');
  });
  next();
});

app.get('/', (req, res) => {
  logger.info('root_hit');
  res.send('Hello from PortOne Dev Exercise');
});

app.get('/slow', async (req, res) => {
  await new Promise(r => setTimeout(r, 700));
  res.send('Slow response');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Server listening on ${port}`));

