const db = require('electron-db');

/**
 * Creates database tables
 * must call this function at first, before anything else
 * @param  none
 */
function initDB() {
    return new Promise((resolve, reject) => {
        let success = true;
        let message = [];
        db.createTable('symbol', (succ, msg) => {
            // succ - boolean, tells if the call is successful
            success = succ && success ? true : false;
            console.log("Create: " + succ + ' Message:', msg);
            message.push(msg);
        });
        db.createTable('quote', (succ, msg) => {
            // succ - boolean, tells if the call is successful
            success = succ && success ? true : false;
            console.log("Create: " + succ + ' Message:', msg);
            message.push(msg);
        });
        db.createTable('historicalquote', (succ, msg) => {
            // succ - boolean, tells if the call is successful
            success = succ && success ? true : false;
            console.log("Create: " + succ + ' Message:', msg);
            message.push(msg);
        });
        db.createTable('optionchain', (succ, msg) => {
            // succ - boolean, tells if the call is successful
            success = succ && success ? true : false;
            console.log("Create: " + succ + ' Message:', msg);
            message.push(msg);
        });
        if(success) {
            resolve(message);
        } else {
            reject(message);
        }
    });
}

/**
 * Add a symbol
 * Add a single symbol to the symbol database
 * @param object { symbol: "TSLA", name: "TSLA Inc." }
 */
function addSymbol(s) {
    return new Promise((resolve, reject)=> {
        // check schema
        if(!s.symbol || !s.name) {
            reject('addSymbol: input argument does not match schema!');
        }

        if (db.valid('symbol')) {
            // check if symbol already exists in db
            db.getRows('symbol', {
                symbol: s.symbol
            }, (succ, result) => {
                console.log('succ:', succ, " result:", result);
                if (succ && result.length > 0) {
                    console.log(result);
                    let where = {
                        "symbol": s.symbol
                    };

                    let set = {
                        "name": s.name
                    };

                    db.updateRow('symbol', where, set, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        console.log("Update: " + succ + ' Message:', msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                } else {
                    db.insertTableContent('symbol', s, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        console.log("Insert: " + succ + ' Message:', msg);
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
        // check schema
        if(!q.symbol || !q.quote) {
            reject('addQuote: input argument does not match schema!');
        }

        if (db.valid('quote')) {
            // check if symbol already exists in db
            db.getRows('quote', {
                symbol: q.symbol
            }, (succ, result) => {
                console.log('succ:', succ, " result:", result);
                if (succ && result.length > 0) {
                    console.log(result);
                    let where = {
                        "symbol": q.symbol
                    };

                    let set = {
                        "quote": q.quote,
                        "timestamp": moment(new Date()).unix()
                    };

                    db.updateRow('quote', where, set, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        console.log("Update: " + succ + ' Message:', msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                } else {
                    q.timestamp = moment(new Date()).unix();
                    db.insertTableContent('quote', q, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        console.log("Insert: " + succ + ' Message:', msg);
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
        // check schema
        if(!q.symbol || !q.historicalquote) {
            reject('addQuote: input argument does not match schema!');
        }

        if (db.valid('historicalquote')) {
            // check if symbol already exists in db
            db.getRows('historicalquote', {
                symbol: q.symbol
            }, (succ, result) => {
                console.log('succ:', succ, " result:", result);
                if (succ && result.length > 0) {
                    console.log(result);
                    let where = {
                        "symbol": q.symbol
                    };

                    let set = {
                        "historicalquote": q.historicalquote,
                        "timestamp": moment(new Date()).unix()
                    };

                    db.updateRow('historicalquote', where, set, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        console.log("Update: " + succ + ' Message:', msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                } else {
                    q.timestamp = moment(new Date()).unix();
                    db.insertTableContent('historicalquote', q, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        console.log("Insert: " + succ + ' Message:', msg);
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
        // check schema
        if(!q.symbol || !q.expiry || !q.optionchain) {
            reject('addQuote: input argument does not match schema!');
        }

        if (db.valid('optionchain')) {
            // check if symbol already exists in db
            db.getRows('optionchain', {
                symbol: q.symbol,
                expiry: q.expiry
            }, (succ, result) => {
                console.log('succ:', succ, " result:", result);
                if (succ && result.length > 0) {
                    console.log(result);
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
                        console.log("Update: " + succ + ' Message:', msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                } else {
                    q.timestamp = moment(new Date()).unix();
                    db.insertTableContent('optionchain', q, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        console.log("Insert: " + succ + ' Message:', msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                }
            });
        }
    });
}



// Export the public available functions
module.exports = {
    initDB,
    addSymbol,
    addQuote,
    addHistoricalQuote,
    addOptionChainQuote
};
