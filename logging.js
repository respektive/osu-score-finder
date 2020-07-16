const fs = require('fs');
const config = require('./config.json');

exports.main = async function (logs) {

    switch (config.loglevel) {
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
        if (logs.level > 0) {
            return;
        } else {
            console.log(logs.data);

            if (config.logtofile == true) {
                fs.appendFile('logs.txt', `${logs.data}\n`, function (err) {
                    if (err) throw err;
                });
            };
        }
    };

    async function warn() {
        if (logs.level > 1) {
            return;
        } else {
            console.log(logs.data);

            if (config.logtofile == true) {
                fs.appendFile('logs.txt', `${logs.data}\n`, function (err) {
                    if (err) throw err;
                });
            };
        }
    };

    async function info() {
        if (logs.level > 2) {
            return;
        } else {
            console.log(logs.data);

            if (config.logtofile == true) {
                fs.appendFile('logs.txt', `${logs.data}\n`, function (err) {
                    if (err) throw err;
                });
            };
        }
    };

    async function verbose() {
        if (logs.level > 3) {
            return;
        } else {
            console.log(logs.data);

            if (config.logtofile == true) {
                fs.appendFile('logs.txt', `${logs.data}\n`, function (err) {
                    if (err) throw err;
                });
            };
        }
    };

    async function debug() {
        if (logs.level > 4) {
            return;
        } else {
            console.log(logs.data);

            if (config.logtofile == true) {
                fs.appendFile('logs.txt', `${logs.data}\n`, function (err) {
                    if (err) throw err;
                });
            };
        }
    };
}