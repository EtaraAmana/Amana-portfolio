// Shared script: mobile menu, footer year, skill bar animation, greeting

document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  // Footer year (dynamic content)
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Time-based greeting on the homepage
  const greet = document.getElementById("greeting");
  if (greet) {
    const hour = new Date().getHours();
    let text = "Good evening";
    if (hour < 12) text = "Good morning";
    else if (hour < 17) text = "Good afternoon";
    greet.textContent = text + ", and welcome to my portfolio!";
  }

  // Animate skill bars from 0 to their value
  const skills = [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 80 },
    { name: "JavaScript", level: 70 },
    { name: "Python", level: 65 },
    { name: "Git & GitHub", level: 60 }
  ];
  const skillBox = document.getElementById("skillBars");
  if (skillBox) {
    skills.forEach(function (s) {
      const div = document.createElement("div");
      div.className = "skill";
      div.innerHTML =
        "<label><span>" + s.name + "</span><span>" + s.level + "%</span></label>" +
        '<div class="bar"><span style="width:0"></span></div>';
      skillBox.appendChild(div);
    });
    setTimeout(function () {
      skillBox.querySelectorAll(".bar span").forEach(function (bar, i) {
        bar.style.width = skills[i].level + "%";
      });
    }, 200);
  }
});
