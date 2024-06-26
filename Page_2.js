document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu1 = dropdown.querySelector('.menu1');
        const options = dropdown.querySelectorAll('.menu1 li');
        const selected = dropdown.querySelector('.selected');

        select.addEventListener('click', () => {
            menu1.classList.toggle('menu1-open');
            caret.classList.toggle('caret-rotate'); // เพิ่มคลาส caret-rotate เพื่อหมุนลูกศร
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                selected.innerText = option.innerText;
                menu1.classList.remove('menu1-open');
            });
        });
    });
});

// ส่วนที่อยู่
document.addEventListener('DOMContentLoaded', function () {
  const dropdowns = document.querySelectorAll('.dropdown1');

  dropdowns.forEach(dropdown1 => {
      const select1 = dropdown1.querySelector('.select1');
      const caret1 = dropdown1.querySelector('.caret1');
      const menu2 = dropdown1.querySelector('.menu2');
      const options1 = dropdown1.querySelectorAll('.menu2 li');
      const selected1 = dropdown1.querySelector('.selected1');

      select1.addEventListener('click', () => { // เปลี่ยน select เป็น select1
          menu2.classList.toggle('menu2-open');
          caret1.classList.toggle('caret1-rotate'); // เปลี่ยน caret เป็น caret1
      });

      options1.forEach(option => { // เปลี่ยน options เป็น options1
          option.addEventListener('click', () => {
              selected1.innerText = option.innerText;
              menu2.classList.remove('menu2-open');
          });
      });
  });
});




const datepicker = document.querySelector(".datepicker");
const dateInput = document.querySelector(".date-input");
const yearInput = datepicker.querySelector(".year-input");
const monthInput = datepicker.querySelector(".month-input");
const cancelBtn = datepicker.querySelector(".cancel");
const applyBtn = datepicker.querySelector(".apply");
const nextBtn = datepicker.querySelector(".next");
const prevBtn = datepicker.querySelector(".prev");
const dates = datepicker.querySelector(".dates");

let selectedDate = new Date();
let year = selectedDate.getFullYear();
let month = selectedDate.getMonth();

// show datepicker
dateInput.addEventListener("click", () => {
  datepicker.hidden = false;
});

// hide datepicker
cancelBtn.addEventListener("click", () => {
  datepicker.hidden = true;
});

// handle apply button click event
applyBtn.addEventListener("click", () => {
  // set the selected date to date input
  dateInput.value = selectedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // hide datepicker
  datepicker.hidden = true;
});

// handle next month nav
nextBtn.addEventListener("click", () => {
  if (month === 11) year++;
  month = (month + 1) % 12;
  displayDates();
});

// handle prev month nav
prevBtn.addEventListener("click", () => {
  if (month === 0) year--;
  month = (month - 1 + 12) % 12;
  displayDates();
});

// handle month input change event
monthInput.addEventListener("change", () => {
  month = monthInput.selectedIndex;
  displayDates();
});

// handle year input change event
yearInput.addEventListener("change", () => {
  year = yearInput.value;
  displayDates();
});

const updateYearMonth = () => {
  monthInput.selectedIndex = month;
  yearInput.value = year;
};

const handleDateClick = (e) => {
  const button = e.target;

  // remove the 'selected' class from other buttons
  const selected = dates.querySelector(".selected");
  selected && selected.classList.remove("selected");

  // add the 'selected' class to current button
  button.classList.add("selected");

  // set the selected date
  selectedDate = new Date(year, month, parseInt(button.textContent));
};

// render the dates in the calendar interface
const displayDates = () => {
  // update year & month whenever the dates are updated
  updateYearMonth();

  // clear the dates
  dates.innerHTML = "";

  //* display the last week of previous month

  // get the last date of previous month
  const lastOfPrevMonth = new Date(year, month, 0);

  for (let i = 0; i <= lastOfPrevMonth.getDay(); i++) {
    const text = lastOfPrevMonth.getDate() - lastOfPrevMonth.getDay() + i;
    const button = createButton(text, true, -1);
    dates.appendChild(button);
  }

  //* display the current month

  // get the last date of the month
  const lastOfMOnth = new Date(year, month + 1, 0);

  for (let i = 1; i <= lastOfMOnth.getDate(); i++) {
    const button = createButton(i, false);
    button.addEventListener("click", handleDateClick);
    dates.appendChild(button);
  }

  //* display the first week of next month

  const firstOfNextMonth = new Date(year, month + 1, 1);

  for (let i = firstOfNextMonth.getDay(); i < 7; i++) {
    const text = firstOfNextMonth.getDate() - firstOfNextMonth.getDay() + i;

    const button = createButton(text, true, 1);
    dates.appendChild(button);
  }
};

const createButton = (text, isDisabled = false, type = 0) => {
  const currentDate = new Date();

  // determine the date to compare based on the button type
  let comparisonDate = new Date(year, month + type, text);

  // check if the current button is the date today
  const isToday =
    currentDate.getDate() === text &&
    currentDate.getFullYear() === year &&
    currentDate.getMonth() === month;

  // check if the current button is selected
  const selected = selectedDate.getTime() === comparisonDate.getTime();

  const button = document.createElement("button");
  button.textContent = text;
  button.disabled = isDisabled;
  button.classList.toggle("today", isToday);
  button.classList.toggle("selected", selected);
  return button;
};

displayDates();