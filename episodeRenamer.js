const fileSystem = require('fs');
const fetch = require('node-fetch');
const parser = require('node-html-parser');

// Configure Script Parameters here
var seriesName = 'Arrow';
var seasonNumber = 6;
var seasonDirectory = 'C:/Users/riyam/Downloads/Arrow Season 6';
var wikipediaUrl = 'https://en.wikipedia.org/wiki/List_of_Arrow_episodes';
var seasonWiseDistribution = [23, 23, 23, 23, 23, 23, 23]; // No. of Episodes per season

console.log(`
    Script initialized with following parameter values:
    -> seriesName = ${seriesName},
    -> seasonNumber = ${seasonNumber},
    -> seasonDirectory = ${seasonDirectory},
    -> wikipediaUrl = ${wikipediaUrl}
`);

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
}

function renameFiles(body) {

    const dom = parser.parse(body);
    var nodeList = dom.querySelectorAll('.summary');

    var SeasonWiseEpisodeList = [];

    var seasonNo = 1;
    while (nodeList.length > 0) {
        console.log("\n\nSeason " + seasonNo);
        var episodeList = [];
        var chunk = nodeList.splice(0, seasonWiseDistribution[seasonNo - 1]);
        var episodeNo = 1;
        chunk.forEach(function (element) {
            var episodeName = seriesName + ' - ' + seasonNo.pad() + 'x' + episodeNo.pad() + " - " + element.rawText.substring(1, element.rawText.length - 1);
            console.log(episodeName);
            episodeList.push(episodeName);
            episodeNo++;
        });
        SeasonWiseEpisodeList.push(episodeList);
        seasonNo++;
    }
}

fetch(wikipediaUrl)
    .then(res => res.text())
    .then(body => renameFiles(body));