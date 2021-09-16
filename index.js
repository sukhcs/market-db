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
            console.log("Success: " + succ);
            console.log("Message: " + msg);
            message.push(msg);
        });
        db.createTable('quote', (succ, msg) => {
            // succ - boolean, tells if the call is successful
            success = succ && success ? true : false;
            console.log("Success: " + succ);
            console.log("Message: " + msg);
            message.push(msg);
        });
        db.createTable('historicalquote', (succ, msg) => {
            // succ - boolean, tells if the call is successful
            success = succ && success ? true : false;
            console.log("Success: " + succ);
            console.log("Message: " + msg);
            message.push(msg);
        });
        db.createTable('option-chain', (succ, msg) => {
            // succ - boolean, tells if the call is successful
            success = succ && success ? true : false;
            console.log("Success: " + succ);
            console.log("Message: " + msg);
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
            let term = s.symbol;

            db.search('symbol', 'symbol', term, (succ, data) => {
                if (succ) {
                    console.log(data);
                    let where = {
                        "symbol": s.symbol
                    };

                    let set = {
                        "name": s.name
                    };

                    db.updateRow('symbol', where, set, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        console.log("Success: " + succ);
                        console.log("Message: " + msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                } else {
                    db.insertTableContent('symbol', s, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        console.log("Success: " + succ);
                        console.log("Message: " + msg);
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
            let term = q.symbol;

            db.search('quote', 'symbol', term, (succ, data) => {
                if (succ) {
                    console.log(data);
                    let where = {
                        "symbol": q.symbol
                    };

                    let set = {
                        "quote": q.quote
                    };

                    db.updateRow('quote', where, set, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        console.log("Success: " + succ);
                        console.log("Message: " + msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                } else {
                    db.insertTableContent('quote', q, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        console.log("Success: " + succ);
                        console.log("Message: " + msg);
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
            let term = q.symbol;

            db.search('historicalquote', 'symbol', term, (succ, data) => {
                if (succ) {
                    console.log(data);
                    let where = {
                        "symbol": q.symbol
                    };

                    let set = {
                        "historicalquote": q.historicalquote
                    };

                    db.updateRow('historicalquote', where, set, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        console.log("Success: " + succ);
                        console.log("Message: " + msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                } else {
                    db.insertTableContent('historicalquote', q, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        console.log("Success: " + succ);
                        console.log("Message: " + msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                }
            });
        }
    });
}

/**
 * Add a option-chain quote
 * Add a single option-chain quote to the option-chain database. The key here is the symbol. The option-chain is a flexible
 * object with no constraint on what is included.
 * @param object { symbol: "TSLA", option-chain: {} }
 */
function addOptionChainQuote(q) {
    return new Promise((resolve, reject)=> {
        // check schema
        if(!q.symbol || !q.option-chain) {
            reject('addQuote: input argument does not match schema!');
        }

        if (db.valid('option-chain')) {
            // check if symbol already exists in db
            let term = q.symbol;

            db.search('option-chain', 'symbol', term, (succ, data) => {
                if (succ) {
                    console.log(data);
                    let where = {
                        "symbol": q.symbol
                    };

                    let set = {
                        "option-chain": q.option-chain
                    };

                    db.updateRow('option-chain', where, set, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        console.log("Success: " + succ);
                        console.log("Message: " + msg);
                        succ ? resolve(msg) : reject(msg);
                    });
                } else {
                    db.insertTableContent('option-chain', q, (succ, msg) => {
                        // succ - boolean, tells if the call is successful
                        console.log("Success: " + succ);
                        console.log("Message: " + msg);
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
