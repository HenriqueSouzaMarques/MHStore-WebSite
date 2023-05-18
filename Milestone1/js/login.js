"use strict";

let buttonCreateAcc = document.getElementById("button-createacc");
buttonCreateAcc.addEventListener("click", showSignIn);

let buttonCloseCreateAcc = document.getElementById("button-close");
buttonCloseCreateAcc.addEventListener("click", hideSignIn);

function showSignIn()
{
    document.getElementById("signin").classList.add("show");
}

function hideSignIn()
{
    document.getElementById("signin").classList.remove("show");
}