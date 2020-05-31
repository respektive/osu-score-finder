# osu! Score Finder

A simple CLI script to find all scores from a user on all ranked maps between two dates.

## Requirements

* Node.js (Made in v12, so only this is supported).
* A valid [osu! api key](https://osu.ppy.sh/p/api).

## Installation

Clone the repository and run `npm i` in the project root.

Paste your osu! Api Key in `api_key.json`.

## Usage

Run the program using `node ./index.js` in the project root.

The program will ask you for what it needs:
* GameMode (0 = STD, 1 = Taiko, 2 = CTB, 3 = Mania)
* User ID
* Start Date (YYYY-MM-DD)
* End Date (YYYY-MM-DD)
* Include Converts (0 = No, 1 = Yes)

Please only use these formats! There is no error handling for wrong formats for now, so i will not offer support for any issues coming up if you fuck up to type it in the given form. Will add later though.

## Notes

The current request speed is 1 Req/Sec. The api ratelimit is 1200 req/min, however as specified in the api docs, you are supposed to give peppy a yell if you do more than 60 request per minute. You can raise it in the `index.js` file, do that at your own risk though.
