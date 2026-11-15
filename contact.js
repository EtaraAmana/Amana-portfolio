// Contact form validation

const form = document.getElementById("contactForm");
const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  message: document.getElementById("message")
};

function setError(field, msg) {
  document.getElementById(field.id + "Error").textContent = msg;
  field.classList.toggle("invalid", msg !== "");
  field.classList.toggle("valid", msg === "");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isDigitsOnly(value) {
  return /^[0-9]+$/.test(value);
}

function validateField(key) {
  const field = fields[key];
  const value = field.value.trim();
  let msg = "";

  if (value === "") {
    msg = "This field cannot be empty.";
  } else if (key === "email" && !isValidEmail(value)) {
    msg = "Enter a valid email address (e.g. name@example.com).";
  } else if (key === "phone" && !isDigitsOnly(value)) {
    msg = "Phone number must contain digits only.";
  }

  setError(field, msg);
  return msg === "";
}

// Live validation as the user leaves each field
Object.keys(fields).forEach(function (key) {
  fields[key].addEventListener("blur", function () { validateField(key); });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let allValid = true;
  Object.keys(fields).forEach(function (key) {
    if (!validateField(key)) allValid = false;
  });

  const success = document.getElementById("successBox");
  if (allValid) {
    success.style.display = "block";
    success.textContent = "Thank you, " + fields.name.value.trim() + "! Your message has been sent.";
    form.reset();
    Object.keys(fields).forEach(function (k) { fields[k].classList.remove("valid", "invalid"); });
  } else {
    success.style.display = "none";
  }
});
