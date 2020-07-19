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

let prompt_schema = {
    properties: {
        mode: {
            description: 'Select Mode you want to Search',
            default: 0,
            pattern: /^[0-3]{1}$/,
            message: '\nMode has to be a single digit between 0 and 3.\n0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania',
            required: true
        },
        user_id: {
            description: 'Enter User-ID you want to Search',
            pattern: /^[0-9]+$/,
            message: '\nUser ID has to be numeric.',
            required: true
        },
        start_date: {
            description: 'Enter the date you want to start your Search with',
            pattern: /^[2][0-9]{3}[-][0-1][1-9][-][0-3][0-9]$/,
            message: '\nHas to be a valid date! Has to be in format: YYYY-MM-DD',
            required: true
        },
        end_date: {
            description: 'Enter the date you want to end your Search with',
            pattern: /^[2][0-9]{3}[-][0-1][1-9][-][0-3][0-9]$/,
            message: '\nHas to be a valid date! Has to be in format: YYYY-MM-DD',
            required: true
        },
        converts: {
            description: 'Do you want to include converts? !! WARNING LONG PROCESSING !! 0 = NO, 1 = YES',
            pattern: /^[0-1]$/,
            message: '\nHas to be a valid date! Has to be in format: YYYY-MM-DD',
            required: true
        }
    }
}

prompt.start();
console.log(`osu! score finder v${config.version}`);
prompt.get(prompt_schema, function (err, result) {
    if (err) {
        logs = ({
            data: `[ERROR] | ${new Date(Date.now()).toLocaleString()} | ${err}\n`,
            level: 0
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