
 console.log("Welcome to tasky app. This is tasky.js");
let url = window.location.pathname;
if (url == '/tasky.github.io/Notes.html') {
  showNotes(null);
  console.log(url);
  

  let search = document.getElementById('searchTxt');
  search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
      let cardTxt = element.getElementsByTagName("p")[0].innerText;
      let cardTitle = element.getElementsByTagName("h5")[0].innerText;
      cardTitle = cardTitle.toLowerCase();
      cardTxt = cardTxt.toLowerCase();
      if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
        element.style.display = "block";
      }
      else {
        element.style.display = "none";
      }
    })
  })
}


if (url == '/tasky.github.io/tasky.html') {

  let addBtn = document.getElementById("addBtn");
  addBtn.addEventListener("click", function (e) {
    console.log("hello")
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle")
    let notes = localStorage.getItem("notes");
    let alarm = document.getElementById("addAlarmDate");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    myObj = {
      title: addTitle.value,
      text: addTxt.value,
      alarm: alarm.value
    }
    if (addTxt.value != 0 && addTitle.value != 0) {
      notesObj.push(myObj);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      addTxt.value = "";
      addTitle.value = "";
      let message = document.getElementById("message");
      message.innerHTML += `<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">SUCCESS ;-) </h4>
  <p>Your Note is added Successfully!!.</p>
</div>`;
      setTimeout(function () {
        message.innerHTML = '';
      }, 2000);
      // showNotes();
      setAlarm();
    } else {
      let message = document.getElementById("message");
      message.innerHTML += `<div class="alert alert-danger" role="alert">
  <h4 class="alert-heading">Please enter all the fields :-( </h4>
  <p>Please Try Again.</p>
</div>`;
      setTimeout(function () {
        message.innerHTML = '';
      }, 2000);
    }
  });

}

function showNotes(value) {
  console.log(value);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    // let date = Date.parse(element.alarm)
    let date = element.alarm.split(' ');
    let givenDate = new Date(element.alarm);
    givenDate = Date.parse(givenDate)

    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear();
    let todayDate = month + " " + day + " " + year + ' ' + '0:0:0 GMT+0530 (India Standard Time)'
    todayDate = Date.parse(todayDate);
    let alarmDate = new Date(element.alarm);
    var alarmMonth = alarmDate.getMonth() + 1;
    var alarmDay = alarmDate.getDate();
    var alarmYear = alarmDate.getFullYear();
    let finalDate = alarmDay + "-" + alarmMonth + "-" + alarmYear
    setAlarm(date);
    html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem; background:#b2fae2;border:none;">
    <span class="rounded">
                    <div class="card-body">
                        <h5 class="card-title"> ${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                          <div class="">
                            <p style="padding:0px;"> ${givenDate < todayDate ? 'Today' : finalDate}   ${date[1] == undefined ? '' : date[1]}</p>
                          </div>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn submitButton">Delete Note</button>
                     </div>
                     </span>
                </div>
                `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<h6>Nothing to show! Use "Home Page" to add notes.</h6>`;
  }
}


function setAlarm(value) {
  // let alarmDate = document.getElementById("addAlarmDate");
  console.log(value);
  alarm = new Date(value);
  now = new Date();
  let timeToAlarm = alarm - now;
  console.log(timeToAlarm);
  if (timeToAlarm >= 0) {
    setTimeout(() => {
      ringBell();
      // console.log("Yeh BOii");
    }, timeToAlarm);
  }
  value = "";
}


let audio = new Audio('alarm.mp3');
function ringBell() {
  audio.play();
  console.log("Ringing Now");
};



function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  let message = document.getElementById("message");
  message.innerHTML += `<div class="alert alert-warning" role="alert">
  <h4 class="alert-heading">Deleted!! </h4>
  <p>Your Note is deleted.</p>
</div>`;
  setTimeout(function () {
    message.innerHTML = '';
  }, 2000);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}



