const db = require('electron-db');
const moment = require('moment-timezone');
const Logger = require('./logger');

let _tables = ['symbol', 'quote', 'historicalquote', 'optionchain'];

let logger;

// in seconds
const ONEMIN = 60;
const FIVEMIN = 300;
const TENMIN = 600;
const QUARTERHOUR = 900;
const HALFHOUR = 1800;
const HOUR = 3600;
const DAY = 3600 * 24;

/**
 * Creates database tables
 * must call this function at first, before anything else
 * @param  none
 */
function initDB() {
    return new Promise((resolve, reject) => {
        let success = true;
        let message = [];
        if(!logger) {
            reject('[MARKET-DB] initialize logger first by calling initLogger');
        }
        db.createTable('symbol', (succ, msg) => {
            // succ - boolean, tells if the call is successful
            success = succ && success ? true : false;
            message.push(msg);
        });
        db.createTable('quote', (succ, msg) => {
            // succ - boolean, tells if the call is successful
            success = succ && success ? true : false;
            message.push(msg);
        });
        db.createTable('historicalquote', (succ, msg) => {
            // succ - boolean, tells if the call is successful
            success = succ && success ? true : false;
            message.push(msg);
        });
        db.createTable('optionchain', (succ, msg) => {
            // succ - boolean, tells if the call is successful
            success = succ && success ? true : false;
            message.push(msg);
        });
        if(success) {
            resolve(message);
        } else {
            reject(message);
        }
    });
}

function initLogger(env, logLevel) {
    if(!env) {
        env = 'development';
    }
    logger = Logger.createLogger(env, logLevel);
    logger.debug('[MARKET-DB] Logger initialized!');
    return logger;
}

/**
 * Add a symbol
 * Add a single symbol to the symbol database
 * @param object { symbol: "TSLA", name: "TSLA Inc." }
 */
function addSymbol(s) {
    return new Promise((resolve, reject)=> {
        if(!logger) {
            reject('[MARKET-DB] initialize logger first by calling initLogger');
        }
        // check schema
        if(!s.symbol || !s.name) {
            reject('[MARKET-DB] addSymbol: input argument does not match schema!');
        }

        if (db.valid('symbol')) {
            // check if symbol already exists in db
            db.getRows('symbol', {
                symbol: s.symbol
            }, (succ, result) => {
                if (succ && result.length > 0) {
                    let where = {
                        "symbol": s.symbol
                    };

                    let set = {
                        "name": s.name,
                        "timestamp": moment(new Date()).unix()
                    };

                    db.updateRow('symbol', where, set, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        logger.silly("[MARKET-DB] Symbol Insert: " + succ + ' Message:', msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                } else {
                    s.timestamp = moment(new Date()).unix();
                    db.insertTableContent('symbol', s, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        logger.silly("[MARKET-DB] Symbol Insert: " + succ + ' Message:', msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                }
            });
        }
    });
}

/**
 * Add a quote
 * Add a single quote to the symbol database. The key here is the symbol. The quote is a flexible
 * object with no constraint on what is included.
 * @param object { symbol: "TSLA", quote: {} }
 */
function addQuote(q) {
    return new Promise((resolve, reject)=> {
        if(!logger) {
            reject('[MARKET-DB] initialize logger first by calling initLogger');
        }
        // check schema
        if(!q.symbol || !q.quote) {
            reject('[MARKET-DB] addQuote: input argument does not match schema!');
        }

        if (db.valid('quote')) {
            // check if symbol already exists in db
            db.getRows('quote', {
                symbol: q.symbol
            }, (succ, result) => {
                if (succ && result.length > 0) {
                    let where = {
                        "symbol": q.symbol
                    };

                    let set = {
                        "quote": q.quote,
                        "timestamp": moment(new Date()).unix()
                    };

                    db.updateRow('quote', where, set, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        logger.silly("[MARKET-DB] Quote Update: " + succ + ' Message:', msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                } else {
                    q.timestamp = moment(new Date()).unix();
                    db.insertTableContent('quote', q, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        logger.silly("[MARKET-DB] Quote Insert: " + succ + ' Message:', msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                }
            });
        }
    });
}

/**
 * Add a historical quote
 * Add a single historical quote to the historicalquote database. The key here is the symbol. The quote is a flexible
 * object with no constraint on what is included.
 * @param object { symbol: "TSLA", historicalquote: {} }
 */
function addHistoricalQuote(q) {
    return new Promise((resolve, reject)=> {
        if(!logger) {
            reject('[MARKET-DB] initialize logger first by calling initLogger');
        }
        // check schema
        if(!q.symbol || !q.historicalquote) {
            reject('[MARKET-DB] addHistoricalQuote: input argument does not match schema!');
        }

        if (db.valid('historicalquote')) {
            // check if symbol already exists in db
            db.getRows('historicalquote', {
                symbol: q.symbol
            }, (succ, result) => {
                logger.debug('succ:', succ, " result:", result);
                if (succ && result.length > 0) {
                    logger.debug(result);
                    let where = {
                        "symbol": q.symbol
                    };

                    let set = {
                        "historicalquote": q.historicalquote,
                        "timestamp": moment(new Date()).unix()
                    };

                    db.updateRow('historicalquote', where, set, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        logger.debug("[MARKET-DB] HistQuote Update: " + succ + ' Message:', msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                } else {
                    q.timestamp = moment(new Date()).unix();
                    db.insertTableContent('historicalquote', q, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        logger.debug("[MARKET-DB] HistQuote Insert: " + succ + ' Message:', msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                }
            });
        }
    });
}

/**
 * Add a option chain quote
 * Add a single optionchain quote to the optionchain database. The key here is the symbol. The optionchain is a flexible
 * object with no constraint on what is included.
 * @param object { symbol: "TSLA", expiry: <epoch>, optionchain: {} }
 */
function addOptionChainQuote(q) {
    return new Promise((resolve, reject)=> {
        if(!logger) {
            reject('[MARKET-DB] initialize logger first by calling initLogger');
        }
        // check schema
        if(!q.symbol || !q.expiry || !q.optionchain) {
            reject('[MARKET-DB] addOptionChain: input argument does not match schema!');
        }

        if (db.valid('optionchain')) {
            // check if symbol already exists in db
            db.getRows('optionchain', {
                symbol: q.symbol,
                expiry: q.expiry
            }, (succ, result) => {
                if (succ && result.length > 0) {
                    let where = {
                        "symbol": q.symbol,
                        "expiry": q.expiry
                    };

                    let set = {
                        "optionchain": q.optionchain,
                        "timestamp": moment(new Date()).unix()
                    };

                    db.updateRow('optionchain', where, set, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        logger.debug("[MARKET-DB] OptionChain Update: " + succ + ' Message:', msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                } else {
                    q.timestamp = moment(new Date()).unix();
                    db.insertTableContent('optionchain', q, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        logger.debug("[MARKET-DB] OptionChain Insert: " + succ + ' Message:', msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                }
            });
        }
    });
}

/**
 * Check the timestamp on a table and returns whether the current timestamp is within the 'after' window
 * if timestamp is within 'after', fetch is set to false; else true;
 * @param table - name of the table
 * @param params { symbol: "TSLA", expiry: <epoch> }; expiry only required for optionchain table
 * @params after - the amount of time that must be elapsed before another fetch is required
 * @return { fetch: boolean, seconds: <time left>, record: <matched row>}
 */
function checkTimestamp(table, params, after) {
    return new Promise((resolve, reject) => {
        if(!logger) {
            reject('[MARKET-DB] initialize logger first by calling initLogger');
        }
        // basic checks
        if(!_tables.includes(table)) {
            reject('[MARKET-DB] checkTimestamp: No valid table name. Provide, one of ', _tables.join(','));
        }

        if(!params) {
            reject('[MARKET-DB] checkTimestamp: No valid params!');
        }

        if(!params.symbol) {
            reject('[MARKET-DB] checkTimestamp: No valid params! symbol definition missing');
        }

        if(table === 'optionchain' && !params.expiry) {
            reject('[MARKET-DB] checkTimestamp: No valid params! expiry definition missing for optionchain query');
        }

        if(!after) {
            // set after to FIVEMIN
            after = FIVEMIN;
        }

        if (db.valid(table)) {
            // check if symbol already exists in db
            db.getRows(table, params, (succ, result) => {
                logger.silly('[MARKET-DB] ++checkTimestamp :: succ: ', succ," result: ", result);
                if(succ && result == '') {
                    logger.debug('[MARKET-DB] null result, fetch anyways');
                    // fetch anyway, there's no table, or table is empty
                    resolve({ fetch: true, seconds: 0, record: {} });
                }
                if (succ && result.length > 0) {
                    // get timestamp from result
                    const ts = result[0].timestamp;
                    // get current time
                    const currTS = moment(new Date()).unix();
                    // check difference
                    const diff = currTS - (ts + after);
                    let rs = { fetch: diff > 0, seconds: diff, record: result[0] };
                    logger.debug('[MARKET-DB] checkTimestamp: rs::', rs);
                    resolve(rs);
                } else {
                    reject('[MARKET-DB] checkTimestamp: could not get timestamp!', succ, result);
                }
            });
        }
    });
}

// Export the public available functions
module.exports = {
    initLogger,
    initDB,
    addSymbol,
    addQuote,
    addHistoricalQuote,
    addOptionChainQuote,
    checkTimestamp
};
