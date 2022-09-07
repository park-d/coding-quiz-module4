//DOM Elements
var olElement = document.getElementById("highscores-list");
//grabbing actual scoreboard to display on page
var scoreboardList = JSON.parse(localStorage.getItem("scoreboard"))

//looping through the scoreboard array and creating a list item and text for each of them
for (let i=0; i<scoreboardList.length; i++){
var liElement =document.createElement('li');
liElement.textContent=scoreboardList[i].playerInitials + " --- "+ scoreboardList[i].score + " points"

//appending the created ordered list to the page
olElement.appendChild(liElement)
}
