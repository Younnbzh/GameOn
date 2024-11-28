function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
const menuBtn = document.querySelector(".icon");
const submitForm = document.querySelector(".btn-submit");
const radioBtns = document.querySelectorAll(".checkbox-label");
const checkboxBtns = document.querySelectorAll(".checkbox2-label");
var errorform = 0;
var submited = false;
var tournamentradioclicked = 0;

// launch mobile nav
menuBtn.addEventListener("click", editNav);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  if (submited) {
    resetForm();
  }
}

// Fake radio update input
radioBtns.forEach((radios) => radios.addEventListener("click", function () { updateRadio(radios); }));
checkboxBtns.forEach((checkboxes) => checkboxes.addEventListener("click", function () { updateCheckboxes(checkboxes); }));

// Update radio input while clicking on fake radio class element
function updateRadio(radios) {
  //set all to 0
  for (i = 1; i <= 6; i++) {
    document.getElementById('location' + i).setAttribute('value', 0);
  }
  //set input value to 1
  let inputRadio = document.getElementById(radios.attributes.for.value);
  inputRadio.setAttribute('value', 1);
  tournamentradioclicked = 1;
}

// Update checkbox input while clicking on fake checkbox class element
function updateCheckboxes(checkboxes) {
  let inputCheckbox = document.getElementById(checkboxes.attributes.for.value);
  if (inputCheckbox.checked) {
    inputCheckbox.checked = false;
    document.getElementById(checkboxes.attributes.for.value).click();
  }
  else {
    inputCheckbox.checked = true;
    document.getElementById(checkboxes.attributes.for.value).click();
  }
}


// Submit form event
submitForm.addEventListener("click", checkForm);

// Check form
function checkForm() {
  removeErrors();
  // Check first name
  if (!lengthValidation('first')) {
    errorform = 1;
    errorClass('first', 'Votre prénom doit comporter 2 caractères minimum');
  }
  // Check last name
  if (!lengthValidation('last')) {
    errorform = 1;
    errorClass('last', 'Votre nom doit comporter 2 caractères minimum');
  }
  // Check email
  if (!emailValidation('email')) {
    errorform = 1;
    errorClass('email', 'Votre e-mail n\'est pas valide');
  }
  // Check birthdate
  if (!checkDate('birthdate')) {
    errorform = 1;
    errorClass('birthdate', 'Votre date de naissance n\'est pas valide');
  }
  // Check number of competitions
  if (!checkInteger('quantity')) {
    errorform = 1;
    errorClass('quantity', 'Le nombre de tournois n\'est pas valide');
  }
  // Check tournament location 
  if (tournamentradioclicked == 0) {
    errorform = 1;
    errorClass('locationend', 'Merci de sélectionner un tournois');
  }
  // Check EUA
  if (document.getElementById('checkbox1').checked == false) {
    errorform = 1;
    errorClass('aftereua', 'Merci d\' accepter les conditions d\'utilisation');
  }
  // If everything is ok show success message
  if (errorform != 1) {
    document.getElementById("formreserve").style.display = "none";
    let p = document.createElement('p');
    p.textContent = 'Merci pour votre inscription';
    let a = document.createElement('a');
    var linkText = document.createTextNode("Fermer");
    a.appendChild(linkText);
    a.href = '#';
    a.onclick = closeModal;
    let div = document.createElement('div');
    div.setAttribute("id", "successmsg");
    div.className = "successmsg";
    div.append(p, a);
    let formreserve = document.querySelector('#formreservecont');
    formreserve.append(div);
    submited = true;
  }
}
// Function to reset the form 
function resetForm() {
  document.getElementById("successmsg").remove();
  document.getElementById("formreserve").reset();
  document.getElementById("formreserve").style.display = "block";
}
// Function to add an error class and send an error message to the user
function errorClass(idinput, message) {
  if (document.contains(document.getElementById("error-" + idinput))) {
    document.getElementById("error-" + idinput).remove();
  }
  let input = document.getElementById(idinput);
  let p = document.createElement('p');
  p.className = "error-msg";
  p.id = "error-" + idinput;
  p.textContent = message;
  input.after(p);
  input.parentNode.classList.add("error-div");
}
// Function to check lenght of an input (should be at least 2 char)
function lengthValidation(idinput) {
  let inputValue = document.getElementById(idinput).value;
  if (inputValue !== null && inputValue.length >= 2) {
    return true;
  }
  else {
    return false;
  }
}
// Function to check email
function emailValidation(idinput) {
  let inputValue = document.getElementById(idinput).value;
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(inputValue).toLowerCase());
}
// Function to check date
function checkDate(idinput) {
  let birthdate = new Date(document.getElementById(idinput).value);
  // check is date is correct and not in future
  const currentDate = new Date();
  if ((isNaN(birthdate.getTime())) || (birthdate > currentDate)) {
    return false;
  }
  else {
    return true;
  }
}
// Function to check if a value is an integer btw 0-99
function checkInteger(idinput) {
  let inputValue = document.getElementById(idinput).value;
  const regex = /^[0-9]$|^[1-9][0-9]$|^(99)$/;
  return regex.test(String(inputValue).toLowerCase());
}
// Function to remove error messages
function removeErrors() {
  errorform = 0;
  const errorMsgs = document.getElementsByClassName('error-msg');
  while (errorMsgs.length > 0) {
    errorMsgs[0].parentNode.removeChild(errorMsgs[0]);
  }
  var errorDivs = document.querySelectorAll(".error-div");
  [].forEach.call(errorDivs, function (el) {
    el.classList.remove("error-div");
  });
}