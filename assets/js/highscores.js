//DOM Elements
var olElement = document.getElementById("highscores-list");
//grabbing actual scoreboard to display on page
var scoreboardList = JSON.parse(localStorage.getItem("scoreboard"))

//sorting scores so that it is sorted from high to low
scoreboardList.sort(function (a, b) {
    return b.score - a.score
});

//looping through the scoreboard array and creating a list item and text for each of them
for (let i = 0; i < scoreboardList.length; i++) {
    var liElement = document.createElement('li');
    liElement.textContent = scoreboardList[i].playerInitials + " --- " + scoreboardList[i].score + " points"

    //appending the created ordered list to the page
    olElement.appendChild(liElement)
}

// creating a function to clear the scores in local storage if user clicks clear scores button
function clearScoreboard() {
    window.localStorage.removeItem('scoreboard');
    window.location.reload();
}
document.getElementById('clear-scores').onclick = clearScoreboard;