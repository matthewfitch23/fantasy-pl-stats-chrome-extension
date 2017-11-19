var playerCount = 0;
var remainingAttempts = 25;
var timeout = 1000;
var playerDivClass = 'ism-element';

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

    players.forEach(element => {
        element.appendChild(createStatsElement('test'))
    });
}

function createStatsElement(playerName) {
    var div = document.createElement('div');
    var content = document.createTextNode(playerName);
    div.appendChild(content);

    return div;
}

havePlayersLoaded();