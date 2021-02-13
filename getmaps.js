const axios = require('axios');
const fs = require('fs');
const config = require('./config.json');

let maps = { "data": [] };
let map_data = null;

async function main() {

    try {
        while (map_data == null || map_data.data.length != 0) {
            console.log(`Requested ${maps.data.length} Maps so far!`)
            async function run() {
                map_data = await axios
                    .get(
                        `https://osu.ppy.sh/api/get_beatmaps?k=${config.apikey}&since=${config.last_map}&m=0&a=0`
                    )
                    .catch((err) => {
                        console.log(err);
                    });

                map_data.data.forEach(map => {
                    maps.data.push(map);
                })

                config.last_map = maps.data[maps.data.length - 1].approved_date;
                console.log(config.last_map);

                return (function () { });
            } setTimeout(await run(), 200);

        }
    } catch (e) {
        console.log(e);
    } finally {
        try {
            console.log("Now writing to file, this might take a while...");
            fs.writeFile("maps.json", JSON.stringify(maps), (err) => { console.log(err) });
        } catch (e) {
            console.log(e);
        } finally {
            console.log("Finished! DO NOT OPEN IN A SHITTY TEXT EDITOR UNLESS YOU LOVE LAG!");
        }
    }
};
main();