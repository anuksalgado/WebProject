const add = function(){
  console.log(2+3);
};
// add();
// add();

function runTwice(fun){
  fun();
  fun();
}
runTwice(add);

function startButtonClick(){
  setTimeout(function(){
    document.querySelector('.start-button-func').innerHTML = 'Loading';
  },1000)
  setTimeout(function(){
    document.querySelector('.start-button-func').innerHTML = 'Finished';
  },2000)
}
let clicked = false;
let id;
function addCart(){
  if(!clicked){
    document.querySelector('.added').innerHTML = "Added";
    id = setTimeout(function(){
      document.querySelector('.added').innerHTML = "";
    },2000)
    clicked = true;
  }
  else{
    clearInterval(id);
    document.querySelector('.added').innerHTML = "Added";
    setTimeout(function(){
      document.querySelector('.added').innerHTML = "";
    },2000)
  }
  
};

function notificationStart(){
  setInterval(function(){
    document.title = '(2) New messages'
  },1000)
  setInterval(function(){
    document.title = 'Advanced Exercises'
  },2000)
}