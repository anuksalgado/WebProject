
let score = JSON.parse(localStorage.getItem('score'));

if(score === null){
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}

updateScoreElement();

let isAutoPlaying = false;
let intervalID;

function autoPlay(){
  if(!isAutoPlaying){
    intervalID = setInterval(function(){
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000)
  isAutoPlaying = true;
  }
  else{
    /*This essentially takes the most recent function ID from above and stops it*/
    clearInterval(intervalID);
    isAutoPlaying = false;
  }

};

function playGame(move){
  const computerMove = pickComputerMove();

  let result = ''
  if(move === 'Scissors') 
  {
    if(computerMove === 'Scissors'){
    result = 'Tie'
    score.ties += 1;
  } else if (computerMove === 'Rock'){
    result = ' you lose'
    score.losses += 1;
  } else if (computerMove === 'Paper'){
    result = 'You win'
    score.wins +=1;
  }

  localStorage.setItem('score', JSON.stringify(score))
  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You <img src="images/${move}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
  }
  else if(move === 'Rock')
  {
    let result = ''
    if(computerMove === 'Rock'){
      result = 'Tie'
      score.ties += 1;
    } else if (computerMove === 'paper'){
      result = 'you lose'
      score.losses += 1;
    } else if (computerMove === 'Scissors'){
      result = 'You win'
      score.wins +=1;
    }

    localStorage.setItem('score', JSON.stringify(score))
    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You <img src="images/${move}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
  }
  else if(move === 'Paper')
  {
    let result = ''
    if(computerMove === 'Paper'){
      result = 'Tie'
      score.ties += 1;
    } else if (computerMove === 'Scissors'){
      result = 'you lose'
      score.losses += 1;
    } else if (computerMove === 'Rock'){
      result = 'You win'
      score.wins +=1;
    }

    localStorage.setItem('score', JSON.stringify(score))
    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You <img src="images/${move}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
  }
      
}

let computerMove = '';
function pickComputerMove(){
  const randomNumber = Math.random()
  if(randomNumber >= 0 && randomNumber< 1/3){
    computerMove = 'Rock';
  }else if(randomNumber >= 1/3 && randomNumber <= 2/3){
    computerMove = 'Paper';
  } else if(randomNumber >= 2/3 && randomNumber <= 3/3){
    computerMove = 'Scissors';
  }
  return computerMove;
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}