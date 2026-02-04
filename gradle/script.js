const X = [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10]; // value of x for graph label 
let Y = []; // value of y corresponding to each value of x for graph

//rng to generate slope
let seed = Math.round((Math.random() - 0.5) * 400)/100;

//generate apropriate y value for each x
for (let i = -10; i <= 10; i++)
{
    Y.push(i * seed); 
}

// generate the graph
const Question = new Chart("graph", {
    type: "line", 
    data: {
        labels: X, // fill x axis
        datasets: [{
            label: "Y = ?X",
            fill: false,
            pointRadius: 0, // by default the graph has dots for each (x,y)
            borderColor: "rgba(0,0,0,0.8)",
            data: Y // fill y axis
          }]
    },
    options: {    
        tooltips: { enabled: false }, // if enabled exact (x,y) is known, ruining the game 
        scales: {
            
            //without these the thing that changes is the graph not the gradient
            yAxes : [{
                ticks : {
                    max : 10,    
                    min : -10,
                    stepSize: 1
                }
            }],
            xAxes : [{
                ticks : {
                    max : 10,    
                    min : -10,
                    stepSize: 1
                }
            }],
        },
    }
  });

let numOfGuess = 0; // number of guesses
let guessResult; // emoji in the result column

// padding for amount of spaces in the table (surely there's better method but i cant think of any)      
let noPad;
let guessPad;

// ran when clicking the Submit button
function check()
{
    // get answer
    let answer = parseFloat(document.getElementById("answer").value).toFixed(2);

    // check answer validity 
    if (answer > 2 || answer < -2 || answer == "" || answer == "NaN")
    {
        document.getElementById("warning").innerHTML = "invalid input!"
    } 
    else
    {
        document.getElementById("warning").innerHTML = " ";
        numOfGuess++; // add number of guesses by 1

        // set the winning condiiton
        if (answer > seed) guessResult = "⬇"
        else if (answer < seed) guessResult = "⬆"
        else 
        {
            guessResult = "🟰";
            document.getElementById("submit").disabled = true;
            if (numOfGuess > 1) document.getElementById("warning").innerHTML = `You got the right answer in ${numOfGuess} tries!<br>(click ? or refresh to try again)`;
            else document.getElementById("warning").innerHTML = `You got the right answer in ${numOfGuess} try!<br>(click ? or refresh to try again)`;
        }

        // if negative, because of the extra "-", needs to -1 white space
        if (answer < 0) guessPad = "        ";
        else guessPad = "         ";

        // padding for space between No. and Guess (also can't find a simpler method)
        if (numOfGuess < 10) noPad  = "        ";
        else if (numOfGuess < 100) noPad  = "       ";
        else if (numOfGuess < 1000) noPad  = "      ";
        else if (numOfGuess < 10000) noPad  = "     ";
        else if (numOfGuess < 100000) noPad  = "    ";
        else if (numOfGuess < 1000000) noPad  = "   ";
        else if (numOfGuess < 10000000) noPad  = "  ";
        else noPad  = " ";

        // add the guess and result to the table
        let guesses = document.getElementById("guesses");
        let newGuess = document.createElement("h2");
        newGuess.className = "text pre";
        newGuess.textContent = `${numOfGuess}${noPad}${answer}${guessPad}${guessResult}`;
        guesses.appendChild(newGuess);
    }
}

// send to wiki if ? is pressed, also acts as an easy refresh button
function getHelp()
{
    console.log("heelp");
    window.location = "https://en.wikipedia.org/wiki/Slope";
}