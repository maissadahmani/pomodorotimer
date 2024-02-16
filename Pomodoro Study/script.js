const inputtext = document.getElementById("input-text");
const containerlist = document.getElementById("container-list");


function addTask(){
    if (inputtext.value === ""){
        alert("Task is empty !!!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputtext.value;
        containerlist.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputtext.value="";
    saveData();
}

containerlist.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);


document.addEventListener("keydown" , function(ev){
    if(ev.keyCode===13){
        addTask();
    }
})

function saveData(){
    localStorage.setItem("data", containerlist.innerHTML);
}

function showData(){
    containerlist.innerHTML = localStorage.getItem("data");
}

showData();

let focusBtn = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakBtn = document.getElementById("short");
let longBreakBtn = document.getElementById("long");
let startBtn = document.getElementById("btn-start");
let pauseBtn = document.getElementById("btn-pause");
let resetBtn = document.getElementById("btn-reset");
let sessionBtn = document.querySelectorAll(".btn-session");
let shortSessionBtn = document.getElementById("shortsession");
let longSessionBtn = document.getElementById("longsession");
let time = document.getElementById("time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`;
const audio = new Audio("https://dl.dropboxusercontent.com/s/1cdwpm3gca9mlo0/kick.mp3");



const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};
const sessionRemoveFocus = () => {
  sessionBtn.forEach((btn) => {
    btn.classList.remove("btn-focus-session");
  });
};
const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

shortSessionBtn.addEventListener("click", () => {
  sessionRemoveFocus();
  longSessionBtn.classList.remove("btn-focus-session");
  shortSessionBtn.classList.add("btn-focus-session");

  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;

  document.getElementById("timer").style.backgroundColor = "rgb(200, 91, 111, 0.61)";

resetBtn.addEventListener(
    "click",
    (resetTime = () => {
      pauseTimer();
     switch(active){
        case "long":
            minCount= 14;
            break;
        case "short":
            minCount= 4;
            break;
        default:
            minCount=24;
            break;
        
     }
     count = 59;
      time.textContent = `${minCount + 1}:00`;
    })
  );



focusBtn.addEventListener("click", () => {
  removeFocus();
  active="focus";
  focusBtn.classList.add("btn-focus");
  pauseTimer();
  document.getElementById("timer").style.backgroundColor = "rgb(200, 91, 111, 0.61)";
  count = 59;
  minCount = 24;
  time.textContent = `${minCount + 1}:00`;
});

shortBreakBtn.addEventListener("click", () => {
    document.getElementById("timer").style.backgroundColor = "rgb(193, 119, 131) ";
    active="short";
  removeFocus();
  shortBreakBtn.classList.add("btn-focus");
  pauseTimer();
  count = 59;
  minCount = 4;
  time.textContent = `${minCount + 1}:00`;
});
longBreakBtn.addEventListener("click", () => {
    document.getElementById("timer").style.backgroundColor = "rgb(180, 111, 123)"; /*rgb(199, 121, 134)*/
    active="long";
  removeFocus();
  longBreakBtn.classList.add("btn-focus");
  pauseTimer();
  count = 59;
  minCount = 14;
  time.textContent = `${minCount + 1}:00`;
});

pauseBtn.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pauseBtn.classList.remove("show");
    resetBtn.classList.remove("show");
  })
);

startBtn.addEventListener("click", () => {
    resetBtn.classList.add("show");
    pauseBtn.classList.add("show");
    startBtn.classList.add("hide");
    startBtn.classList.remove("show");
  if (paused ) {
  paused = false;
  
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
          startBtn.classList.remove("hide");
          pauseBtn.classList.remove("show");
          resetBtn.classList.remove("show");
          resetTime();
          onend();


        }
      }
  }, 1000);

  }
});
});
longSessionBtn.addEventListener("click", () => {
  sessionRemoveFocus();
  shortSessionBtn.classList.remove("btn-focus-session");
  longSessionBtn.classList.add("btn-focus-session");
  minCount = 49;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
  document.getElementById("timer").style.backgroundColor = "rgb(233, 164, 175) ";


  resetBtn.addEventListener(
    "click",
    (resetTime = () => {
      pauseTimer();
     switch(active){
        case "long":
            minCount= 29;
            break;
        case "short":
            minCount= 9;
            break;
        default:
            minCount=49;
            break;
        
     }
     count = 59;
      time.textContent = `${minCount + 1}:00`;
    })
  );



focusBtn.addEventListener("click", () => {
  removeFocus();
  active="focus";
  focusBtn.classList.add("btn-focus");
  pauseTimer();
  document.getElementById("timer").style.backgroundColor = "rgb(233, 164, 175) ";
  count = 59;
  minCount = 49;
  time.textContent = `${minCount + 1}:00`;
});

shortBreakBtn.addEventListener("click", () => {
    document.getElementById("timer").style.backgroundColor = "rgb(218, 142, 154) ";
    active="short";
  removeFocus();
  shortBreakBtn.classList.add("btn-focus");
  pauseTimer();
  count = 59;
  minCount = 9;
  time.textContent = `${minCount + 1}:00`;
});
longBreakBtn.addEventListener("click", () => {
    document.getElementById("timer").style.backgroundColor = "rgb(192, 95, 112)"; /*rgb(199, 121, 134)*/
    active="long";
  removeFocus();
  longBreakBtn.classList.add("btn-focus");
  pauseTimer();
  count = 59;
  minCount = 29;
  time.textContent = `${minCount + 1}:00`;
});

pauseBtn.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pauseBtn.classList.remove("show");
    resetBtn.classList.remove("show");
  })
);

startBtn.addEventListener("click", () => {
    resetBtn.classList.add("show");
    pauseBtn.classList.add("show");
    startBtn.classList.add("hide");
    startBtn.classList.remove("show");
  if (paused ) {
  paused = false;
  
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
          startBtn.classList.remove("hide");
          pauseBtn.classList.remove("show");
          resetBtn.classList.remove("show");
          resetTime();
          onend();


        }
      }
  }, 1000);

  }
});
});

function onend() {
    audio.play(); 
   
  }
  

  