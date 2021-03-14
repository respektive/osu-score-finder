const axios = require('axios');
const fs = require('fs');
const config = require('./config.json');

let maps = { "data": [] };
let map_data = null;
let clear = 0;
let last_req;

async function main() {

    try {
        while (map_data == null || map_data.data.length != 0 && clear == 0) {
            console.log(`Requested ${maps.data.length} Maps so far!`)
            async function run() {

                map_data = await axios
                    .get(
                        `https://osu.ppy.sh/api/get_beatmaps?k=${config.apikey}&since=${config.last_map}&m=${config.mode}&a=0`
                    )
                    .catch((err) => {
                        console.log(err);
                    });

                last_req = map_data.data[map_data.data.length - 1];

                map_data.data.forEach(map => {
                    if (new Date(map.approved_date) > new Date(config.final_map)) {
                        clear = 1;
                    } else if (map.beatmapset_id == last_req.beatmapset_id) {
                        return;
                    } else if (map.approved != 1 && map.approved != 2 /*&& map.approved != 4*/) {
                        return;
                    } else {
                        maps.data.push(map);
                    }
                });

                map_data = await axios
                    .get(`https://osu.ppy.sh/api/get_beatmaps?k=${config.apikey}&m=${config.mode}&a=0&s=${last_req.beatmapset_id}`)
                    .catch((err) => {
                        console.log(err);
                    });

                map_data.data.forEach(map => {
                    if (map.beatmap_id == config.beatmap_id) {
                        clear = 1;
                    } else if (map.approved != 1 && map.approved != 2/* && map.approved != 4*/) {
                        config.beatmap_id = map.beatmap_id
                    } else if (map.beatmapset_id == last_req.beatmapset_id) {
                    } else {
                        maps.data.push(map);
                    };

                    config.beatmap_id = map.beatmap_id

                });

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
