const dayInput = document.querySelector('input[name="day"]');
const monthInput = document.querySelector('input[name="month"]');
const yearInput = document.querySelector('input[name="year"]');
const yearsDisplay = document.querySelector('.date.years');
const monthDisplay = document.querySelector('.date.months');
const dayDisplay = document.querySelector('.date.days');
const submitButton = document.getElementById('form-btn');
const formLabels = document.querySelectorAll('label');
const formInputs = document.querySelectorAll('input');
const requiredMessages = document.querySelectorAll('.required-message');

const toggleErrorClasses = (action) => {
    formLabels.forEach((label) => label.classList[action]('error'));
    formInputs.forEach((input) => input.classList[action]('error'));
};

const displayErrorMessage = (index, message) => {
    requiredMessages[index].style.display = 'block';
    requiredMessages[index].textContent = message;
};

const clearErrorMessage = (index) => {
    requiredMessages[index].textContent = '';
};

submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    const year = parseInt(yearInput.value, 10);
    const month = parseInt(monthInput.value, 10);
    const day = parseInt(dayInput.value, 10);

    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const daysInMonth = [ 31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    let isValid = true;

    formInputs.forEach((input, i) => {
        if (!input.value.trim()) {
            displayErrorMessage(i, 'This field is required');
            isValid = false;
        } else {
            clearErrorMessage(i);
        }
    });

    if (!isValid) {
        toggleErrorClasses('add');
        return;
    }

    let hasError = false;

    if (year < 1930 || year > 2023) {
        displayErrorMessage(2, 'Must be in the past');
        hasError = true;
    } else {
        clearErrorMessage(2);
    }

    if (month < 1 || month > 12) {
        displayErrorMessage(1, 'Must be a valid month');
        hasError = true;
    } else {
        clearErrorMessage(1);
    }

    if (day < 1 || day > 31 || day > daysInMonth[month - 1]) {
        displayErrorMessage(0, 'Must be a valid day');
        hasError = true;
    } else {
        clearErrorMessage(0);
    }

    if (hasError) {
        toggleErrorClasses('add');
    } else {
        toggleErrorClasses('remove');
        const inputDate = new Date(year, month - 1, day);
        const currDate = new Date();
        const timeDifference = currDate - inputDate;

        const msYear = 365.25 * 24 * 60 * 60 * 1000;
        const msMonth = msYear / 12;
        const msDay = 24 * 60 * 60 * 1000;

        const years = Math.floor(timeDifference / msYear);
        const months = Math.floor((timeDifference % msYear) / msMonth);
        const days = Math.floor((timeDifference % msMonth) / msDay);

        yearsDisplay.textContent = `${ years } `;
        monthDisplay.textContent = `${ months } `;
        dayDisplay.textContent = `${ days } `;
    }
});

