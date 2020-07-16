const fs = require('fs');
const axios = require('axios');
const readline = require('readline-sync');
const api = require('./api_key.json');
const config = require('./config.json');
const module_index = require('./module_index.js');

async function wrapper() {

    await fs.writeFile("maps.json", JSON.stringify({ "maps": [] }), function (data) { });
    await fs.writeFile("data.json", JSON.stringify({ "scores": [] }), function (data) { });
    await fs.writeFile("logs.txt", "", function (data) { });

    console.log(`osu! score finder v${config.version}\n`);

    var mode = readline.question("What gamemode do you want to search? (0 = STD, 1 = Taiko, 2 = CTB, 3 = Mania)\n");
    var user_id = readline.question("What user do you want to search? (User ID only!)\n");
    var start_date = readline.question("What date do you want to start with? (YYYY-MM-DD)\n");
    var end_date = readline.question("What date do you want to end with? (YYYY-MM-DD)\n");
    var include_converts = readline.question("Do you want to include converts? !!WARNING!! Extremely Long Processing Time! (0 = No, 1 = Yes)\n");
    var req_speed = 1000 // This is the Request speed. 1000 = 1 Req/Sec. The api ratelimit is 1200 req/min, however as specified in the api docs, you are supposed to give peppy a yell if you do more than 60 request per minute. Raise this at your own risk.
    var i = 0;
    var map_count = 0;
    var logs;

    async function main() {

        let current_date = start_date;

        let userdata = await axios.get(`https://osu.ppy.sh/api/get_user?k=${api.osu_key}&u=${user_id}&m=${mode}&type=id`);

        await maps_get();

        async function maps_get() {

            axios.get(`https://osu.ppy.sh/api/get_beatmaps?k=${api.osu_key}&m=${mode}&a=${include_converts}&since=${current_date}`).then(async res => {

                await fs.readFile('maps.json', async function (err, data) {

                    var json = JSON.parse(data)

                    if (res.data[0] == null) {
                        return;
                    } else {
                        if (new Date(res.data[res.data.length - 1].approved_date) > new Date(end_date)) {

                            map_count = map_count + res.data.length

                            await fs.readFile('maps.json', async function (err, data) {

                                var json = JSON.parse(data)

                                json = { maps: json.maps.concat(res.data) }

                                await fs.writeFile('maps.json', JSON.stringify(json), async function (data) {
                                    logs = ({ data: `[INFO] | ${new Date(Date.now()).toLocaleString()} | Found ${map_count} Maps! Now checking scores...\n`, level: 2 });
                                    module_index.logging.main(logs);
                                    await score_get();
                                })
                            });


                        } else {
                            current_date = res.data[res.data.length - 1].approved_date.slice(0, 10);

                            logs = ({ data: `[VERBOSE] | ${new Date(Date.now()).toLocaleString()} | Now requesting from ${current_date} and later!`, level: 3 });
                            module_index.logging.main(logs);

                            map_count = map_count + res.data.length

                            await fs.readFile('maps.json', async function (err, data) {

                                var json = JSON.parse(data)

                                json = { maps: json.maps.concat(res.data) }

                                await fs.writeFile("maps.json", JSON.stringify(json), async function (data) { setTimeout(maps_get, req_speed); })
                            });
                        }
                    }

                })

            })
        }

        async function score_get() {

            let maps = require('./maps.json');

            axios.get(`https://osu.ppy.sh/api/get_scores?k=${api.osu_key}&b=${maps.maps[i].beatmap_id}&u=${user_id}&m=${mode}`).then(async res => {

                await fs.readFile('data.json', async function (err, data) {

                    var json = JSON.parse(data)

                    if (res.data[0] == null) {
                        res.data = [{ "score_id": "0", "score": "0", "username": userdata.data[0].username, "maxcombo": "0", "count50": "0", "count100": "0", "count300": "0", "countmiss": "0", "countkatu": "0", "countgeki": "0", "perfect": "0", "enabled_mods": "0", "user_id": user_id, "date": "0", "rank": "0", "pp": "0", "replay_available": "0" }]
                        res.data[0].beatmap_id = maps.maps[i - 1].beatmap_id
                        logs = ({ data: `[VERBOSE] | ${new Date(Date.now()).toLocaleString()} | Did not find a score on Beatmap: ${maps.maps[i - 1].beatmap_id} - ${maps.maps[i - 1].title} | ${maps.maps[i - 1].version}!`, level: 3 });
                        module_index.logging.main(logs);
                        await json.scores.push(res.data[0])
                        await fs.writeFile("data.json", JSON.stringify(json), function (data) { })
                    } else {
                        res.data[0].beatmap_id = maps.maps[i - 1].beatmap_id
                        logs = ({ data: `[VERBOSE] | ${new Date(Date.now()).toLocaleString()} | Found a score on Beatmap: ${maps.maps[i - 1].beatmap_id} - ${maps.maps[i - 1].title} | ${maps.maps[i - 1].version}! Rank: ${res.data[0].rank}`, level: 3 });
                        module_index.logging.main(logs);
                        await json.scores.push(res.data[0])
                        await fs.writeFile("data.json", JSON.stringify(json), function (data) { })
                    }

                })

            }).catch(err => { logs = ({ data: err, level: 0 }); module_index.logging.main(JSON.parse(logs)); })

            if (i > map_count) {
                logs = ({ data: `Finished running through all maps!`, level: 0 });
                module_index.logging.main(logs);
            } else {
                i++
                setTimeout(score_get, req_speed);
            }


        }
    }
    main()
}
wrapper()