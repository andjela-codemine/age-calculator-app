const dayInput = document.querySelector('input[name="day"]');
const monthInput = document.querySelector('input[name="month"]');
const yearInput = document.querySelector('input[name="year"]');
const yearsDisplay = document.querySelector(".date.years");
const monthDisplay = document.querySelector(".date.months");
const dayDisplay = document.querySelector(".date.days");
const button = document.getElementById("form-btn");
const form = document.getElementById("form");
const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll("input");

toggleErrorClasses = (action) => {
  labels.forEach((label) => label.classList[action]("error"));
  inputs.forEach((input) => input.classList[action]("error"));
};

button.addEventListener("click", (e) => {
  e.preventDefault();

  const year = parseInt(yearInput.value, 10);
  const month = parseInt(monthInput.value, 10);
  const day = parseInt(dayInput.value, 10);

  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.setCustomValidity("This field is required");
      isValid = false;
    } else {
      input.setCustomValidity("");
    }
  });

  toggleErrorClasses(isValid ? "remove" : "add");

  if (!isValid) {
    form.reportValidity();
    return;
  }

  if (year < 1930 || year > 2024) {
    yearInput.setCustomValidity("Invalid year.");
    toggleErrorClasses("add");
    form.reportValidity();
  } else if (month < 1 || month > 12) {
    monthInput.setCustomValidity("Invalid month.");
    toggleErrorClasses("add");
    form.reportValidity();
  } else if (day < 1 || day > daysInMonth[month - 1]) {
    dayInput.setCustomValidity("Invalid day for the selected month");
    toggleErrorClasses("add");
    form.reportValidity();
  } else {
    toggleErrorClasses("remove");
    const inputDate = new Date(year, month - 1, day);
    const currDate = new Date();
    const timeDifference = currDate - inputDate;

    const msYear = 365.25 * 24 * 60 * 60 * 1000;
    const msMonth = msYear / 12;
    const msDay = 24 * 60 * 60 * 1000;

    const years = Math.floor(timeDifference / msYear);
    const months = Math.floor((timeDifference % msYear) / msMonth);
    const days = Math.floor((timeDifference % msMonth) / msDay);

    yearsDisplay.textContent = `${years} `;
    monthDisplay.textContent = `${months} `;
    dayDisplay.textContent = `${days} `;
  }
});
