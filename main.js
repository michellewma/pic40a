// Cookies
let user = getCookie("username");
let color = getCookie("color");
let speed = getCookie("speed");

// Make container and box for display
let container = document.createElement("div");
let box = document.createElement("div");
let content = document.getElementById("content");
container.id = "greyContainer";
box.id = "innerContainer";

if(color == ""){
  // Set default color to red 
  color = "red";
}
if(speed == "") {
  // Set default speed to 0
  speed = 0;
} else {
  // If the speed has been set, set speed to an integer
  speed = parseInt(speed);
}

// console.log(document.cookie);
checkCookie();
updateBoxColor();

/* Update the colored rectangle to the color stored in cookies */
function updateBoxColor(){
  box.style.backgroundColor = color;
}

/* If the cookie has not expired, welcome the user. If it's a user's first time  
   visiting the page or the cookies have expired, prompt for their first name. */
function checkCookie() {
  if (user !== "") {
    alert("Welcome " + user);
    verifyUser();
  } else {
     user = prompt("What is your name?","");
     if (user !== "" && user !== null) {
       setCookie("username", user, 1000 * 10);
       verifyUser();
     }
  }
}

/* Returns the value of a cookie, or empty string if it is not found */
function getCookie(cname){
    let cookie = document.cookie;
    // Split cookie by semicolon and store into array ca
    let ca = cookie.split(';');
    for(let value in ca){
      // For each value in ca, split by equals to access name and value separately
      let a = ca[value].trim().split('=');
      if(a[0] === cname){
        // Return value corresponding to cname
        return a[1];
      }
    }
    return "";
}

/* Sets a cookie with specified name, value, and expiration */
function setCookie(cname, cvalue, cexp){
    let d = new Date();
    d.setTime(d.getTime() + cexp);
    let expires = "expires="+ d.toGMTString();;
    let temp = cname + "=" + cvalue + ";" + expires + ";path=/";
    document.cookie = temp;
    // console.log("Document.cookie set to: ", document.cookie);
}

/* Using an AJAX call, find if user is important.txt. If not, write no greeting. */
function verifyUser(){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // When successfully loaded, store people as an array split by new line
      let people = this.responseText.split('\n');
      let found = false;
      for(let person in people){
        if(user === people[person]){
          // If the user is found in important.txt, let found = true
          found = true;
        }
      }
      if(!found){
        // If the user was not found in important.txt, no greeting
        let noGreeting = document.createElement("p");
        noGreeting.innerHTML = "No greeting for you";
        content.appendChild(noGreeting);
      }else{
        // User was found, so call loadDoc() function
        loadDoc();
      }
    }
  };
  xhttp.open("GET", "important.txt", true);
  xhttp.send();
}

/* Move the "welcome user" box left and right with the speed from cookie */
function animate() {
  // console.log("animating with speed: ", speed);
  let pos = 0;
  let direction = 1;
  let id = setInterval(frame, 10);
  function frame() {
    if (direction === 1 && pos >= 1000) {
      // If it has reached the right side of the container, move left
      direction = -1;
    }else if(direction === -1 && pos <= 0){
      // If it has reached the left side of the container, move right
      direction = 1;
    } else {
      // Move left or right with the user's chosen speed
      pos += direction * speed;
      box.style.left = pos + 'px';
    }
  }
}

/* Create and display buttons for speed and color. 
    Add box and container to the innerHTML. */
function loadDoc(){
  // Make a new <form> for speed
  let speedForm = document.createElement("form");
  speedForm.name = "speed";

  // Make radio buttons with speeds 0-50
  for(let i = 0; i <= 50; i++){
    let btn = document.createElement("input");   
    btn.type = "radio";
    btn.name = "radios";
    btn.id = `button${i}`;
    btn.onclick = function(){
      // When each button is clicked, set speed cookie to 
      // the corresponding value with a 10 second expiry
      setCookie("speed", i, 1000 * 10);
      speed = i;
      updateBoxColor();
    };
    let txt = document.createElement("span");
    txt.innerHTML = `Speed ${i} `;
    speedForm.appendChild(btn);            
    speedForm.insertBefore(txt, btn);
    if(i % 10 === 0){
      // Insert a line break after 0, 10, 20, 30, 40, 50
      speedForm.appendChild(document.createElement("br"));
    }

  }
  // Add the speed form to the html
  content.appendChild(speedForm);
  document.getElementById(`button${speed}`).checked = true;

  // Create a form for color
  let colorForm = document.createElement("form");
  colorForm.name = "color";

  // Red 
  let btn1 = document.createElement("input");   
  btn1.type = "radio";
  btn1.name = "colors";
  btn1.id = "red";
  // On click, update color to red and set cookie to red, expiry in 10 seconds
  btn1.onclick = function(){setCookie("color", "red", 1000 * 10); color="red"; updateBoxColor();};
  let txt1 = document.createElement("span");
  txt1.innerHTML = `red`;
  colorForm.appendChild(btn1);            
  colorForm.insertBefore(txt1, btn1);

  // Yellow
  let btn2 = document.createElement("input");   
  btn2.type = "radio";
  btn2.name = "colors";
  btn2.id = "yellow";
  btn2.onclick = function(){setCookie("color", "yellow", 1000 * 10); color="yellow"; updateBoxColor()};
  let txt2 = document.createElement("span");
  txt2.innerHTML = `yellow`;
  colorForm.appendChild(btn2);            
  colorForm.insertBefore(txt2, btn2);

  //Blue
  let btn3 = document.createElement("input");   
  btn3.type = "radio";
  btn3.name = "colors";
  btn3.id = "blue";
  btn3.onclick = function(){setCookie("color", "blue", 1000 * 10); color="blue"; updateBoxColor()};
  let txt3 = document.createElement("span");
  txt3.innerHTML = `blue`;
  colorForm.appendChild(btn3);            
  colorForm.insertBefore(txt3, btn3);
 
  // Add color form to html
  content.appendChild(colorForm);
  document.getElementById(color).checked = true;

  // Welcome user in the moving box
  box.innerHTML = `Welcome ${user}`;
  container.appendChild(box);
  
  // Add grey container to html
  document.body.appendChild(container);
  
  // Call animate() once loadDoc() is complete
  animate();
}

