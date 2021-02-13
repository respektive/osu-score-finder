# osu! Score Finder v3

## Basic Setup
Clone the repo, you need nodejs v14 (Only tested version) and NPM.
Open a terminal in the directory and run `npm i`
Fill in the `config.json` with your osu! API Key, User ID and the oldest date you want to start with.
Run `node getmaps.js`. This will request all osu!std ranked maps starting with the date you supplied in the config and ending with the newest ranked map (No support for setting an end date yet, probably coming soon)
Finally, run `node getscores.js`. This will get the top score on every map you requested in the previous step and output it to a file named `scores.json`. It's up to you as to what to do with it, you could use excel for example to convert it into a table, and format the data to your liking.

## Important Information
The Script currently sends one request every 500ms, requesting all maps at that speed will take about 10 Hours. This is double the speed of what peppy outlined in the API docs, however you should be able to reduce the request time to about 100ms without issues.
This is a very basic script I made for personal use. While I do plan on continuing to work on it and adding a few quality of life improvements, dont expect too much. 