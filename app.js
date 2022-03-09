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

eventCont.classList.remove('event-container'); // When event list is empty

// Declare EVENT LISTENERS
date.addEventListener('change', (e) => {
  parsedDate = parseDate(date.value)
})

form.addEventListener('submit', addEvent);

document.addEventListener('DOMContentLoaded', getEvents);

eventCont.addEventListener('click', deleteEvent);

function addEvent(e) {
  e.preventDefault();

  const eventTimeLeft = document.createElement('h3'),
        name = document.createElement('span');

  eventTimeLeft.classList.add('countdown');
  name.classList.add('text-black-50');

  name.textContent = eventName.value;

  eventCont.classList.add('event-container'); //When event list is NOT empty
  eventCont.appendChild(eventTimeLeft);
  parsedDate = parseDate(date.value);

  // We keep in each h3 tag we create the info we need
  eventTimeLeft.name = name;
  eventTimeLeft.date = parsedDate;
  eventTimeLeft.h3 = eventTimeLeft;

  storeEventInLS(eventTimeLeft);
  countdown(name ,parsedDate, eventTimeLeft);

  doCountdownInterval();

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

  
  // console.log(timespan);
  const deleteIconHtml = '<a class="delete-icon mx-3"><i class="fas fa-trash fa-xs"></i></a>';

  
  if (timespan <= 0) {
    timeLeft.innerHTML = inputEventName.outerHTML + ' event is a thing of the past 🙏' + ' (' +Math.abs(days) + ' days passed)' + deleteIconHtml;
    return 'done';
  } else {
    timeLeft.innerHTML = inputEventName.outerHTML + ' ⮕ ' + days+' Days ' + hours+' Hours ' + minutes+' Minutes ' + seconds+' Seconds' + deleteIconHtml;
  }

}

function doCountdownInterval() {
  let timerDone;

  document.querySelectorAll('.countdown').forEach(event => {
    event.timer = setInterval(() => {
      timerDone = countdown(event.name, event.date, event.h3);

      if (timerDone === 'done') {
        clearInterval(event.timer);
      }
    }, 1000);

  });
}

function storeEventInLS(event) {
  let events,
    eventToStore = {
      name: event.name.innerText,
      date: event.date,
    };

  if (localStorage.getItem('events') === null) {
    events = [];
  } else {
    events = JSON.parse(localStorage.getItem('events'));
  }

  events.push(eventToStore);
  localStorage.setItem('events', JSON.stringify(events));
}

function getEvents() {
  let events;

  if (localStorage.getItem('events') === null) {
    events = [];
  } else {
    events = JSON.parse(localStorage.getItem('events'));
  }

  events.forEach(event => {
    let timerDone;
    const eventTimeLeft = document.createElement('h3'),
          name = document.createElement('span');
    
    eventTimeLeft.classList.add('countdown');
    name.classList.add('text-black-50');

    name.textContent = event.name;
    eventCont.classList.add('event-container');
    eventCont.appendChild(eventTimeLeft);

    eventTimeLeft.name = name;
    eventTimeLeft.date = new Date(event.date);
    eventTimeLeft.h3 = eventTimeLeft;

    countdown(name , eventTimeLeft.date, eventTimeLeft);
    doCountdownInterval();
  })
}

function deleteEvent(e) {
  console.log('clicked');

  if (e.target.parentElement.className.includes('delete-icon')) {
    if (confirm('Delete this event ??')) {
      e.target.parentElement.parentElement.remove();

      removeEventFromLS(e.target.parentElement.parentElement);
    }
  }
}

function removeEventFromLS(eventInfo) {
  let events;

  if (localStorage.getItem('events') === null) {
    events = [];
  } else {
    events = JSON.parse(localStorage.getItem('events'));
  }

  events.forEach((event, index) => {
    if (event.name === eventInfo.name.innerHTML) {
      events.splice(index, 1);
      return;
    }
  });

  localStorage.setItem('events', JSON.stringify(events));
}

// TODO make some functions reusable