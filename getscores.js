const axios = require('axios');
const fs = require('fs');
const config = require('./config.json');
const maps = require('./maps.json');

let scores = { "data": [] };
let scoredata = {}

async function main() {
    try {
        await maps.data.forEach(function (map, i) {
            setTimeout(async function () {
                try {
                    score_data = await axios
                        .get(
                            `https://osu.ppy.sh/api/get_scores?k=${config.apikey}&m=0&b=${map.beatmap_id}&u=${config.user}&limit=1`
                        )
                } catch (err) {
                    console.log(err)
                } finally {
                    if (score_data.data[0] != undefined) {
                        console.log(`Processed ${scores.data.length + 1} out of ${maps.data.length} maps! Last Rank: ${score_data.data[0].rank}`);
                        scoredata['map'] = map
                        scoredata['score'] = score_data.data[0];
                        scores.data.push(scoredata);
                        scoredata = {}
                    } else {
                        console.log(`Processed ${scores.data.length + 1} out of ${maps.data.length} maps! Last map did not have a score.`);
                        scoredata['map'] = map 
                        scoredata['score'] = {
                            "score_id": "0",
                            "score": "0",
                            "username": "Emilia-tan",
                            "maxcombo": "0",
                            "count50": "0",
                            "count100": "0",
                            "count300": "0",
                            "countmiss": "0",
                            "countkatu": "0",
                            "countgeki": "0",
                            "perfect": "0",
                            "enabled_mods": "0",
                            "user_id": "7511840",
                            "date": "0",
                            "rank": "0",
                            "pp": "0",
                            "replay_available": "0"
                        }
                        scores.data.push(scoredata);
                        scoredata = {}

                    }

                    if (scores.data.length == maps.data.length) {
                        try {
                            console.log("Now writing to file, this might take a while...");
                            fs.writeFile("scores.json", JSON.stringify(scores), (err) => { console.log(err) });
                        } catch (e) {
                            console.log(e);
                        } finally {
                            console.log("Finished! DO NOT, UNDER NO CIRCUMSTANCE, OPEN IT IN A WEAK TEXT EDITOR. THIS THING IS FUCKING MASSIVE.");
                        }
                    }
                }
            }, i * 500);
        });
    } catch (e) {
        console.log(e);
    }
};
main();