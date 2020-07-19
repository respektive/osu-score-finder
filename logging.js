const fs = require('fs');
const config = require('./config.json');
const util = require('util');

exports.main = async function (logs) {

    switch (logs.level) {
        case 0:
            error();
            break;
        case 1:
            warn();
            break;
        default:
        case 2:
            info();
            break;
        case 3:
            verbose();
            break;
        case 4:
            debug();
            break;
    }

    async function error() {
        if (logs.level > config.loglevel) {
            return;
        } else {
            if (logs.type == "obj"){
                console.log(`[ERROR] | ${new Date(Date.now()).toLocaleString()} | ${util.inspect(logs.data, {showHidden: false, depth: null})}\n`);

                if (config.logtofile == true) {
                    fs.appendFile('logs.txt', `[ERROR] | ${new Date(Date.now()).toLocaleString()} | ${util.inspect(logs.data, {showHidden: false, depth: null})}\n`, function (err) {
                        if (err) throw err;
                    });
                };
            } else {
                console.log(`[ERROR] | ${new Date(Date.now()).toLocaleString()} | ${logs.data}\n`);

                if (config.logtofile == true) {
                    fs.appendFile('logs.txt', `[ERROR] | ${new Date(Date.now()).toLocaleString()} | ${logs.data}\n`, function (err) {
                        if (err) throw err;
                    });
                };
            }

        }
    };

    async function warn() {
        if (logs.level > config.loglevel) {
            return;
        } else {
            if (logs.type == "obj"){
                console.log(`[WARN] | ${new Date(Date.now()).toLocaleString()} | ${util.inspect(logs.data, {showHidden: false, depth: null})}\n`);

                if (config.logtofile == true) {
                    fs.appendFile('logs.txt', `[WARN] | ${new Date(Date.now()).toLocaleString()} | ${util.inspect(logs.data, {showHidden: false, depth: null})}\n`, function (err) {
                        if (err) throw err;
                    });
                };
            } else {
                console.log(`[WARN] | ${new Date(Date.now()).toLocaleString()} | ${logs.data}\n`);

                if (config.logtofile == true) {
                    fs.appendFile('logs.txt', `[WARN] | ${new Date(Date.now()).toLocaleString()} | ${logs.data}\n`, function (err) {
                        if (err) throw err;
                    });
                };
            }

        }
    };

    async function info() {
        if (logs.level > config.loglevel) {
            return;
        } else {
            if (logs.type == "obj"){
                console.log(`[INFO] | ${new Date(Date.now()).toLocaleString()} | ${util.inspect(logs.data, {showHidden: false, depth: null})}\n`);

                if (config.logtofile == true) {
                    fs.appendFile('logs.txt', `[INFO] | ${new Date(Date.now()).toLocaleString()} | ${util.inspect(logs.data, {showHidden: false, depth: null})}\n`, function (err) {
                        if (err) throw err;
                    });
                };
            } else {
                console.log(`[INFO] | ${new Date(Date.now()).toLocaleString()} | ${logs.data}\n`);

                if (config.logtofile == true) {
                    fs.appendFile('logs.txt', `[INFO] | ${new Date(Date.now()).toLocaleString()} | ${logs.data}\n`, function (err) {
                        if (err) throw err;
                    });
                };
            }

        }
    };

    async function verbose() {
        if (logs.level > config.loglevel) {
            return;
        } else {
            if (logs.type == "obj"){
                console.log(`[VERBOSE] | ${new Date(Date.now()).toLocaleString()} | ${util.inspect(logs.data, {showHidden: false, depth: null})}\n`);

                if (config.logtofile == true) {
                    fs.appendFile('logs.txt', `[VERBOSE] | ${new Date(Date.now()).toLocaleString()} | ${util.inspect(logs.data, {showHidden: false, depth: null})}\n`, function (err) {
                        if (err) throw err;
                    });
                };
            } else {
                console.log(`[VERBOSE] | ${new Date(Date.now()).toLocaleString()} | ${logs.data}\n`);

                if (config.logtofile == true) {
                    fs.appendFile('logs.txt', `[VERBOSE] | ${new Date(Date.now()).toLocaleString()} | ${logs.data}\n`, function (err) {
                        if (err) throw err;
                    });
                };
            }

        }
    };

    async function debug() {
        if (logs.level > config.loglevel) {
            return;
        } else {
            if (logs.type == "obj"){
                console.log(`[DEBUG] | ${new Date(Date.now()).toLocaleString()} | ${util.inspect(logs.data, {showHidden: false, depth: null})}\n`);

                if (config.logtofile == true) {
                    fs.appendFile('logs.txt', `[DEBUG] | ${new Date(Date.now()).toLocaleString()} | ${util.inspect(logs.data, {showHidden: false, depth: null})}\n`, function (err) {
                        if (err) throw err;
                    });
                };
            } else {
                console.log(`[DEBUG] | ${new Date(Date.now()).toLocaleString()} | ${logs.data}\n`);

                if (config.logtofile == true) {
                    fs.appendFile('logs.txt', `[DEBUG] | ${new Date(Date.now()).toLocaleString()} | ${logs.data}\n`, function (err) {
                        if (err) throw err;
                    });
                };
            }

        }
    };
}