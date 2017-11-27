var playerCount = 0;
var remainingAttempts = 25;
var timeout = 1000;
var playerDivClass = 'ism-element';
var apiUrl = "https://fantasy.premierleague.com/drf/element-summary/";

function havePlayersLoaded() {
    playerCount = document.getElementsByClassName(playerDivClass).length;

    if (playerCount > 0) {
        main();
        return;
    } else {
        remainingAttempts--;
        if(remainingAttempts > 0)
        {
            window.setTimeout(havePlayersLoaded, timeout);
        }
    }
}

function main() {
    console.log('Welcome to the FPL Team Stats Chrome extension!');

    var players = [...document.getElementsByClassName(playerDivClass)];

    console.log(playerCount + ' players found.');

    var client = new HttpClient();
    client.get(apiUrl + "500", function(result) {
        players.forEach(element => {
            element.appendChild(createStatsElement(parseResult(result)));
        });
    });
}

function createStatsElement(playerName) {
    var div = document.createElement('div');
    var content = document.createTextNode(playerName);
    div.appendChild(content);
    div.style = "background-color:#00FF87;";

    return div;
}

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send( null );
    }
}

function parseResult(result) {
    var json = JSON.parse(result);
    var summary = json["history_summary"];
    var points = summary[summary.length - 1]["total_points"]
    console.log(points);
    return points;
}

havePlayersLoaded();