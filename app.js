const date = document.querySelector('#date'),
      eventName = document.querySelector('#event'),
      today = new Date(),
      submitBtn = document.querySelector('.submit-btn'),
      form = document.querySelector('form'),
      // timeLeft = document.querySelector('.countdown'),
      eventCont = document.querySelector('.event-container');

const second = 1000, // milliseconds
      minute = 60 * second,
      hour = 60 * minute,
      day = 24 * hour;

let parsedDate;
debugger;
eventCont.classList.remove('event-container'); // When event list is empty

date.addEventListener('change', (e) => {
  parsedDate = parseDate(date.value)
})

form.addEventListener('submit', addEvent);

function addEvent(e) {
  e.preventDefault();

  let timer, timerDone;
  const timeLeft = document.createElement('h3'),
        name = document.createElement('span');

  timeLeft.classList.add('countdown');
  name.classList.add('text-black-50');

  name.textContent = eventName.value;

  eventCont.classList.add('event-container'); //When event list is NOT empty
  eventCont.appendChild(timeLeft);
  parsedDate = parseDate(date.value);

  // We keep in each h3 tag we create the info we need
  timeLeft.name = name;
  timeLeft.date = parsedDate;
  timeLeft.h3 = timeLeft;

  countdown(name ,parsedDate, timeLeft);

  document.querySelectorAll('.countdown').forEach(event => {
    debugger;
    timer = setInterval(() => {
      debugger;
      timerDone = countdown(event.name, event.date, event.h3);

      if (timerDone === 'done') {
        clearInterval(timer);
      }
    }, 1000);
  });

  eventName.value = '';
  date.value = '';
}


// αναλύση ημερομηνίας σε μερες, μήνες, χρόνια
function parseDate(date) {
  let splitDate = date.split(/\D/);
  return new Date(splitDate[0], splitDate[1] - 1, splitDate[2])
}

// This function will be called by an interval
function countdown(inputEventName, inputDate, timeLeft) {
  const today = new Date(),
        timespan = inputDate - today, //milliseconds
        days = Math.floor(timespan / day), // ms/ms = days
        hours = Math.floor((timespan % day) / hour),
        minutes = Math.floor((timespan % hour) / minute),
        seconds = Math.floor((timespan % minute) / second);

  
  debugger;
  // console.log(timespan);
  
  if (timespan <= 0) {
    timeLeft.innerHTML = inputEventName.innerHTML + ' event is a thing of the past 🙏';
    return 'done';
  } else {
    timeLeft.innerHTML = inputEventName.outerHTML + ' ⮕ ' + days+' Days ' + hours+' Hours ' + minutes+' Minutes ' + seconds+' Seconds';
  }

}