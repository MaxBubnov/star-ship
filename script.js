const colums = document.querySelectorAll('.column');
const boxes = document.querySelectorAll('.star-box');
const allGame = document.querySelector('#game');
let starShipPosition = 2;
const starShip = '<img src="ship.png" alt="star-ship" id="star-ship">';
const buttonRight = document.querySelector('.right');
const fireProgressBar = document.querySelector('.progress-bar');
const buttonLeft = document.querySelector('.left');
const livesBlock = document.querySelector('.lives');
const scoreBlock = document.querySelector('.score');
const pauseButton = document.querySelector('.pause');
let pause = false;
const fireButton = document.querySelector('.fire-button');
let fire = true;
let asteroids;
let lives = 3;
let score = 0;
let time = 700;
function right(){
    if(starShipPosition < 4 && !pause){
        boxes[starShipPosition].innerHTML = '';
        starShipPosition++;
        boxes[starShipPosition].innerHTML += starShip;
    }
}
function left(){
    if(starShipPosition > 0 && !pause){
        boxes[starShipPosition].innerHTML = '';
        starShipPosition--;
        boxes[starShipPosition].innerHTML += starShip;
    }
}
buttonLeft.addEventListener('click', left);
buttonRight.addEventListener('click', right);
document.onkeydown = function keys(e) {
    e = e || window.event;
    console.log(e.key)
    if (e.key === 'ArrowRight'){ right();}
    if (e.key === 'ArrowLeft'){ left();}
    if (e.key === 'ArrowUp'){ explousion();}
}
pauseButton.addEventListener('click', ()=>{
    pause = !pause;
    if(pause){
        clearInterval(intervalOne);
        clearInterval(intervalTwo);

        pauseButton.innerHTML = '<i class="fas fa-play"></i>';
    }else{
        pauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        intervalOne = setInterval(addAsteroids, time);
        intervalTwo = setInterval(moveAsteroids, 40);
    }
})
fireButton.addEventListener('click', explousion);
function explousion(){
    if(fire && !pause){
        colums[starShipPosition].innerHTML += '<div class="laser"></div>';
        fireProgressBar.style.background = '#791e16';
        fire = 0;
        //fireProgressBar.id = 'full-bar';
        setTimeout(function () {
            colums[starShipPosition].innerHTML = '';
            fire = false;
        }, 200);
        //let IntervalThree = setInterval(function () {
            let widthStyle = parseInt(fireProgressBar.style.width);
            if(widthStyle < 100){
                fireProgressBar.style.width = widthStyle + 1 + '%';
            }
        //}, 150);
        setTimeout(function () {
            fire = !fire;
            fireProgressBar.style.background = 'red';
            //fireProgressBar.id = 'full-bar';
            //clearInterval(IntervalThree);
        }, 15000);
    }
}
function addAsteroids() {
    let rand = Math.floor(Math.random() * 5);
    colums[rand].innerHTML += '<div data-col="'+ rand +'" style="transform: translateY(0);" class="asteroid"><img src="ast.png" alt="asteroid"></div>';
}
console.log()
function moveAsteroids() {
    asteroids = document.querySelectorAll('.asteroid');
    asteroids.forEach((item) => {
        let topStyle = item.style.transform.match(/\d/g);
        topStyle = parseInt(topStyle.join(''));
        topStyle += 10;
        //console.log(item.style.transform);
        //console.log(parseInt(item.style.transform));
        //console.log(topStyle);
        item.style.transform = 'translateY('+ topStyle + 'px)';
        if(topStyle > 330 && parseInt(item.dataset.col) === starShipPosition && lives > 0 && fire !== 0){
            lives--;
            livesBlock.innerHTML = lives;
            if(score < 20){
                score = 0;
            }else{
                score -= 20;
            }
            scoreBlock.innerHTML = score;
            if(lives === 0){
                allGame.style.flexDirection = 'column';
                allGame.innerHTML = '<h1>Game Over</h1><div class="replay">Replay</div><h2>Your score :'+ score +'</h2>';
                clearInterval(intervalOne);
                clearInterval(intervalTwo);
                document.querySelector('.replay').addEventListener('click', function (){
                    location.reload();
                })

            }
            item.outerHTML = '';
        }
        if(topStyle > 350){
            //console.log(score);
            item.outerHTML = '';
            score++;
            scoreBlock.innerHTML = score;
            if(time > 250 && time <= 450){
                time -= 2;
                clearInterval(intervalOne);
                intervalOne = setInterval(addAsteroids, time);
            }
            else if(time > 450 && time <= 600){
                time -= 4;
                clearInterval(intervalOne);
                intervalOne = setInterval(addAsteroids, time);
            }else if(time >= 600 && time < 720){
                clearInterval(intervalOne);
                intervalOne = setInterval(addAsteroids, time);
                time -= 5;
            }
            //console.log(time);
        }
    })
}
let intervalOne = setInterval(addAsteroids, time);
let intervalTwo = setInterval(moveAsteroids, 40);