const db = require('./index');
const path = require('path')
const fs = require('fs')

const dbName = 'test';
const dbLocation = path.join(__dirname, 'collections/')

let logger = db.initLogger('development');

logger.info('Hello World!');
