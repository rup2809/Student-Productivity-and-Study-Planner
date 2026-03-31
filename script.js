/* ================= LOGIN SYSTEM ================= */

let students = [{ regno: "24BCE1657", password: "1234" }];

function loginUser(event) {
event.preventDefault();
let r = document.getElementById("regno").value;
let p = document.getElementById("password").value;

if (r === students[0].regno && p === students[0].password) {
window.location.href = "dashboard.html";
return false;
}

document.getElementById("loginMessage").innerHTML = "Invalid Credentials";
return false;
}

function goDashboard() {
window.location.href = "dashboard.html";
}

function toggleTheme() {
document.body.classList.toggle("dark-mode");
}

/* ================= DASHBOARD ================= */

let quotes = [
"Stay consistent.",
"Balance matters.",
"Mental health first.",
"Progress daily.",
"Small steps create big results."
];

function generateQuote() {
let r = Math.floor(Math.random() * quotes.length);
document.getElementById("quoteDisplay").innerHTML = quotes[r];
}

function updateProgress() {
let hours = parseFloat(document.getElementById("progressInput").value) || 0;
let percent = Math.min((hours / 8) * 100, 100);
document.getElementById("progressFill").style.width = percent + "%";
}

/* ================= GPA SYSTEM ================= */

window.onload = function () {

if (document.getElementById("subjectsContainer")) {
for (let i = 1; i <= 10; i++) {
let div = document.createElement("div");
div.innerHTML =
"Subject " + i +
" Grade Point:<input type='number' id='g" + i + "'>" +
" Credits:<input type='number' id='c" + i + "'><br>";
document.getElementById("subjectsContainer").appendChild(div);
}
}

loadProfile();
loadTasks();
loadResources();
};

function calculateGPA() {
let totalPoints = 0, totalCredits = 0;

for (let i = 1; i <= 10; i++) {
let gp = parseFloat(document.getElementById("g" + i).value) || 0;
let cr = parseFloat(document.getElementById("c" + i).value) || 0;
totalPoints += gp * cr;
totalCredits += cr;
}

if (totalCredits === 0) {
document.getElementById("gpaResult").innerHTML = "Enter valid credits";
return;
}

let gpa = totalPoints / totalCredits;
document.getElementById("gpaResult").innerHTML = "GPA: " + gpa.toFixed(2);
}

function generateSemInputs() {
let n = document.getElementById("totalSems").value;
let container = document.getElementById("semesterContainer");
container.innerHTML = "";

for (let i = 1; i <= n; i++) {
container.innerHTML +=
"Sem " + i +
" GPA:<input type='number' id='sem" + i + "'>" +
" Credits:<input type='number' id='cred" + i + "'><br>";
}
}

function calculateCGPA() {
let n = document.getElementById("totalSems").value;
let total = 0, credits = 0;

for (let i = 1; i <= n; i++) {
let g = parseFloat(document.getElementById("sem" + i).value) || 0;
let c = parseFloat(document.getElementById("cred" + i).value) || 0;
total += g * c;
credits += c;
}

if (credits === 0) {
document.getElementById("cgpaResult").innerHTML = "Enter valid credits";
return;
}

document.getElementById("cgpaResult").innerHTML =
"CGPA: " + (total / credits).toFixed(2);
}

/* ================= PLANNER ================= */

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
let taskInput = document.getElementById("taskInput").value;
let priority = document.getElementById("priority").value;

if (!taskInput) return;

tasks.push({ task: taskInput, priority: priority });
localStorage.setItem("tasks", JSON.stringify(tasks));
document.getElementById("taskInput").value = "";
loadTasks();
}

function loadTasks() {
let list = document.getElementById("taskList");
if (!list) return;

list.innerHTML = "";
tasks.forEach((t, index) => {
let li = document.createElement("li");
li.innerHTML = t.task + " (" + t.priority + ") " +
"<button onclick='deleteTask(" + index + ")'>X</button>";
list.appendChild(li);
});

document.getElementById("progressStatus").innerHTML =
"Total Tasks: " + tasks.length;
}

function deleteTask(index) {
tasks.splice(index, 1);
localStorage.setItem("tasks", JSON.stringify(tasks));
loadTasks();
}

function trackStudy() {
let hours = document.getElementById("studyHours").value;
document.getElementById("studyMessage").innerHTML =
"Great! You studied " + hours + " hours today.";
}

function addTestReminder() {
let name = document.getElementById("testName").value;
let date = document.getElementById("testDate").value;
document.getElementById("testReminderMsg").innerHTML =
"Test '" + name + "' scheduled on " + date;
}

function addAssignmentReminder() {
let name = document.getElementById("assignName").value;
let date = document.getElementById("assignDate").value;
document.getElementById("assignmentReminderMsg").innerHTML =
"Assignment '" + name + "' due on " + date;
}

/* ================= PROFILE ================= */

function saveDetails() {
let profile = {
name: document.getElementById("fullName").value,
dept: document.getElementById("department").value,
sem: document.getElementById("semester").value,
section: document.getElementById("section").value,
cgpa: document.getElementById("cgpa").value
};

localStorage.setItem("profile", JSON.stringify(profile));
document.getElementById("detailsOutput").innerHTML = "Details Saved!";
}

function loadProfile() {
let data = JSON.parse(localStorage.getItem("profile"));
if (!data) return;

if (document.getElementById("fullName")) {
document.getElementById("fullName").value = data.name;
document.getElementById("department").value = data.dept;
document.getElementById("semester").value = data.sem;
document.getElementById("section").value = data.section;
document.getElementById("cgpa").value = data.cgpa;
}
}

/* ================= MATERIALS ================= */

let resources = JSON.parse(localStorage.getItem("resources")) || [];

function addResource() {
let link = document.getElementById("resourceLink").value;
if (!link) return;

resources.push(link);
localStorage.setItem("resources", JSON.stringify(resources));
document.getElementById("resourceLink").value = "";
loadResources();
}

function loadResources() {
let list = document.getElementById("resourceList");
if (!list) return;

list.innerHTML = "";
resources.forEach((r, index) => {
let li = document.createElement("li");
li.innerHTML =
"<a href='" + r + "' target='_blank'>" + r + "</a> " +
"<button onclick='deleteResource(" + index + ")'>X</button>";
list.appendChild(li);
});
}

function deleteResource(index) {
resources.splice(index, 1);
localStorage.setItem("resources", JSON.stringify(resources));
loadResources();
}

/* ================= WELLNESS ================= */

function trackMood() {
let mood = document.getElementById("mood").value;
document.getElementById("moodMessage").innerHTML =
"You're feeling " + mood + " today.";
}

function checkStress() {
let level = document.getElementById("stressLevel").value;

if (level >= 7)
document.getElementById("stressMessage").innerHTML =
"High stress detected. Take a break!";
else
document.getElementById("stressMessage").innerHTML =
"Stress level is manageable.";
}

let affirmations = [
"You are capable.",
"You are improving every day.",
"Your hard work will pay off.",
"Stay calm and focused."
];

function generateAffirmation() {
let r = Math.floor(Math.random() * affirmations.length);
document.getElementById("affirmationDisplay").innerHTML =
affirmations[r];
}

/* ================= TIMER ================= */

let interval;

function startTimer(duration) {
let time = duration;
clearInterval(interval);

interval = setInterval(function () {
let m = Math.floor(time / 60);
let s = time % 60;

document.getElementById("timerDisplay").innerHTML =
(m < 10 ? "0" : "") + m + ":" +
(s < 10 ? "0" : "") + s;

if (--time < 0) {
clearInterval(interval);
alert("Time up!");
}
}, 1000);
}

function startCustom() {
let min = parseInt(document.getElementById("customMin").value) || 0;
let time = min * 60;
clearInterval(interval);

interval = setInterval(function () {
let m = Math.floor(time / 60);
let s = time % 60;

document.getElementById("customDisplay").innerHTML =
(m < 10 ? "0" : "") + m + ":" +
(s < 10 ? "0" : "") + s;

if (--time < 0) {
clearInterval(interval);
alert("Custom Timer Done");
}
}, 1000);
}

