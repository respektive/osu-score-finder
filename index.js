const fs = require('fs');
const axios = require('axios');
const readline = require('readline-sync');
const config = require('./api_key.json');

async function wrapper() {

    await fs.writeFile("maps.json", JSON.stringify({ "maps": [] }), function(data) {});
    await fs.writeFile("data.json", JSON.stringify({ "scores": [] }), function(data) {});

    console.log("osu! score finder v1\n");

    var mode = readline.question("What gamemode do you want to search? (0 = STD, 1 = Taiko, 2 = CTB, 3 = Mania)\n");
    var user_id = readline.question("What user do you want to search? (User ID only!)\n");
    var start_date = readline.question("What date do you want to start with? (YYYY-MM-DD)\n");
    var end_date = readline.question("What date do you want to end with? (YYYY-MM-DD)\n");
    var include_converts = readline.question("Do you want to include converts? !!WARNING!! Extremely Long Processing Time! (0 = No, 1 = Yes)\n");
    var req_speed = 1000 // This is the Request speed. 1000 = 1 Req/Sec. The api ratelimit is 1200 req/min, however as specified in the api docs, you are supposed to give peppy a yell if you do more than 60 request per minute. Raise this at your own risk.
    var i = 0;
    var map_count = 0;

    async function main() {

        let current_date = start_date;

        await maps_get()

        async function maps_get() {



            axios.get(`https://osu.ppy.sh/api/get_beatmaps?k=${config.osu_key}&m=${mode}&a=${include_converts}&since=${current_date}`).then(async res => {

                await fs.readFile('maps.json', async function(err, data) {

                    var json = JSON.parse(data)

                    if (res.data[0] == null) {
                        return;
                    } else {
                        if (new Date(res.data[res.data.length - 1].approved_date) > new Date(end_date)) {

                            map_count = map_count + res.data.length

                            await fs.readFile('maps.json', async function(err, data) {

                                var json = JSON.parse(data)

                                json = { maps: json.maps.concat(res.data) }

                                await fs.writeFile('maps.json', JSON.stringify(json), async function(data) {
                                    console.log(`Found ${map_count} Maps! Now checking scores...\n`);
                                    await score_get();
                                })
                            });


                        } else {
                            current_date = res.data[res.data.length - 1].approved_date.slice(0, 10);

                            console.log(`Now requesting from ${current_date} and later!`)

                            map_count = map_count + res.data.length

                            await fs.readFile('maps.json', async function(err, data) {

                                var json = JSON.parse(data)

                                json = { maps: json.maps.concat(res.data) }

                                await fs.writeFile("maps.json", JSON.stringify(json), async function(data) { setTimeout(maps_get, req_speed); })
                            });
                        }
                    }

                })

            })
        }

        async function score_get() {

            let maps = require('./maps.json');

            axios.get(`https://osu.ppy.sh/api/get_scores?k=${config.osu_key}&b=${maps.maps[i].beatmap_id}&u=${user_id}&m=${mode}`).then(async res => {

                await fs.readFile('data.json', async function(err, data) {

                    var json = JSON.parse(data)

                    if (res.data[0] == null) {
                        res.data = [{ "404": "Not Found" }]
                        res.data[0].beatmap_id = maps.maps[i - 1].beatmap_id
                        console.log(`Did not find a score on Beatmap: ${maps.maps[i - 1].beatmap_id} - ${maps.maps[i - 1].title} | ${maps.maps[i - 1].version}!`)
                        await json.scores.push(res.data[0])
                        await fs.writeFile("data.json", JSON.stringify(json), function(data) {})
                    } else {
                        res.data[0].beatmap_id = maps.maps[i - 1].beatmap_id
                        console.log(`Found a score on Beatmap: ${maps.maps[i - 1].beatmap_id} - ${maps.maps[i - 1].title} | ${maps.maps[i - 1].version}! Rank: ${res.data[0].rank}`)
                        await json.scores.push(res.data[0])
                        await fs.writeFile("data.json", JSON.stringify(json), function(data) {})
                    }

                })

            }).catch(err => { console.log(err) })

            if (i > map_count) {
                console.log("Finished running through all maps!");
            } else {
                i++
                setTimeout(score_get, req_speed);
            }


        }
    }
    main()
}
wrapper()