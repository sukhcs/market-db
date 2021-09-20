const winston = require('winston');

exports.createLogger = (env) => {
    const logger = winston.createLogger({
        level: 'debug',
        transports: [
            new winston.transports.File({
                filename: __dirname + '/error.log',
                level: 'error'
            }),
            new winston.transports.File({
                filename: __dirname + '/combined.log'
            })
        ],
        'colorize': true
    });

    const customLogger = getCustomLoggerMiddleware(logger);

    if (env !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }));
    }
    return customLogger;
};

function getCustomLoggerMiddleware(logger) {
    const customLogger = {};
    customLogger.error = reduceLogger(logger.error)
    customLogger.warn = reduceLogger(logger.warn)
    customLogger.info = reduceLogger(logger.info)
    customLogger.http = reduceLogger(logger.http)
    customLogger.verbose = reduceLogger(logger.verbose)
    customLogger.debug = reduceLogger(logger.debug)
    customLogger.silly = reduceLogger(logger.silly)
    return customLogger;
}

function reduceLogger(loggerFun) {
    return (...args) => {
        const data = args.reduce((acc, item) => acc += item);
        loggerFun(data);
    }
}

