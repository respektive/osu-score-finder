// Requirements
const axios = require('axios');
const fs = require('fs');
const prompt = require('prompt');

// File Links
const module_index = require('./module_index.js');
const config = require('./config.json');
const api_key = require('./api_key_dev.json');

//File Reset
fs.writeFile("logs.txt", "", function (err) {
    if (err) {
        logs = ({
            data: `[ERROR] | ${new Date(Date.now()).toLocaleString()} | ${err}\n`,
            level: 3
        });
        module_index.logging.main(logs)
    }
});

// User Prompt
prompt.start();
console.log(`osu! score finder v${config.version}`);
prompt.get(['mode', 'user_id', 'start_date', 'end_date', 'converts'], function (err, result) {
    if (err) {
        logs = ({
            data: `[ERROR] | ${new Date(Date.now()).toLocaleString()} | ${err}\n`,
            level: 3
        });
        module_index.logging.main(logs)
    }
    if (result) {
        logs = ({
            data: `[DEBUG] | ${new Date(Date.now()).toLocaleString()} | Input received: \nMode: ${result.mode}\nUser-ID: ${result.user_id}\nStart Date: ${result.start_date}\nEnd Date: ${result.end_date}\nConverts: ${result.converts}\n`,
            level: 4
        });
        module_index.logging.main(logs)
    }
});