let minutes
let startgame = document.getElementById("startgame")
let timeSelect = document.getElementById("timeselect")
let gameMin = document.getElementById("gameminute")
let image = document.getElementById("img")
let loading = document.getElementById("loading")
startgame.addEventListener("click", () => {
    setTimeout(() => {
        startgame.style.display = "none"
        gameMin.style = "animation:modalKeyFrame 0.8s 1; display:block"
        gameMin.addEventListener("click", () => {
            timeSelect.style = "animation: gameKeyFrame 0.8s 1; display: block"
            timeSelect.addEventListener("change", theval)
        })

        image.style = "animation:gameKeyFrame 0.8s 1; display:block"
        image.src = "./images/good-luck-gif-4.gif"
    }, 500);
})
function quesFetch() {
    gameMin.style.display = "none"
    timeSelect.style.display = "none"
    loading.textContent = "Fecthing Questions..."
    setTimeout(() => {
        loading.style.display = "none"
        startGame()
    }, 2000);
}

function theval(e) {
    minutes = e.target.value
    // startGame()
    quesFetch()
}
function startGame() {
    gameMin.style.display = "none"
    timeSelect.style.display = "none"

    let randSign = ["*", "+", "-", "/"]
    let btnContainer = document.querySelector(".btnContainer")
    let wrong = document.createElement("button")
    wrong.textContent = "False"
    wrong.style.animation = "modalKeyFrame 0.8s 1"
    let right = document.createElement("button")
    wrong.classList.add("wrong")
    right.textContent = "True"
    right.style.animation = "modalKeyFrame 0.8s 1"
    right.classList.add("right")

    btnContainer.append(right, wrong)
    let TF;
    let question = document.getElementById("question")
    let scoreupdate = document.getElementById("scoreUpdate")
    let score = 0
    questions()
    function questions() {
        let randNum = Math.floor(Math.random() * 5)
        let rand = Math.floor(Math.random() * 5)
        let ans = Math.floor(Math.random() * 20)
        let corEquat = "randNum * rand"
        let sign = randSign[Math.floor(Math.random() * randSign.length)]

        function solveEquation(equation) {
            let modifiedEquation = equation.replace("*", sign)
            let result
            switch (sign) {
                case "*":
                    result = eval(modifiedEquation)
                    break;
                case "+":
                    result = eval(modifiedEquation)
                    break;
                case "-":
                    result = eval(modifiedEquation)
                    break;
                case "/":
                    result = eval(modifiedEquation)
                    break;

                default:
                    result = NaN
                    break;
            }
            return result
        }
        let solution = solveEquation(corEquat)
        question.textContent = randNum + sign + rand + "=" + ans
        if (ans === solution) {
            TF = true
        } else {
            TF = false
        }
    }

    let ques = 1
    let image = document.getElementById("img")
    scoreupdate.textContent = "score : " + score
    right.addEventListener("click", () => {
        ques += 1
        if (TF === true) {
            console.log("correct");
            score += 1
            scoreupdate.textContent = "score : " + score
            image.src = "./images/Thumbs Up Good GIF - Thumbs Up Good Good Job - Dis.gif"
        } else {
            console.log("not correct");
            image.src = "./images/ur-wrong.gif"
            image.style.display = "block"
        }
        questions()
    })

    wrong.addEventListener("click", () => {
        ques += 1
        if (TF !== true) {
            console.log("yes not correct");
            score += 1
            scoreupdate.textContent = "score : " + score
            image.src = "./images/Thumbs Up Good GIF - Thumbs Up Good Good Job - Dis.gif"

        } else {
            console.log("no its correct");
            image.src = "./images/a4b237becb291492b93bf20be615204b.gif"
        }
        questions()
    })
    let seconds = minutes * 60
    let timerDisplay = document.getElementById("timer")
    let timer = setInterval(function () {
        seconds--
        let minutesRemaining = Math.floor(seconds / 60)
        let secondsRemaining = seconds % 60
        if (minutesRemaining < 10) {
            minutesRemaining = "0" + minutesRemaining
        }
        if (secondsRemaining < 10) {
            secondsRemaining = "0" + secondsRemaining
        }
        timerDisplay.textContent = "Time remianing : " + minutesRemaining + ":" + secondsRemaining
        timerDisplay.style.animation = "gameKeyFrame 0.8s 1"
        if (seconds == 0) {
            clearInterval(timer)
            image.src = "./images/congrats-15.gif"
            let gameover = document.getElementById("gameover")
            gameover.textContent = "Game Over"
            gameover.style = "display:block; animation: gameKeyFrame 0.8s 1; color: red"
            timerDisplay.innerHTML = "Time's up"
            question.style.display = "none"
            timerDisplay.style.color = "red"
            right.textContent = "Play Again"
            wrong.style.display = "none"
            scoreupdate.textContent = "you answered " + score + " questions correctly" + " out of " + ques
            scoreupdate.style.animation = "modalKeyFrame 0.8s 1"
            right.addEventListener("click", () => {
                location.reload()
            })
        }
    }, 1000)
}
