/* jshint curly: true, esversion: 6, eqeqeq: true, latedef: true, laxbreak: true */
//Variables housed here are meant to capture localstorage events.
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

//Weekdays constant array is needed to help determine the amount of days leftover from the previous month.
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const eventTitleInputEdit = document.getElementById('eventTitleInputEdit');
const deleteEventModal = document.getElementById('deleteEventModal');
const outputStorage = document.getElementById('outputStorage');
const eventText = document.getElementById('eventText');
const eventDosageInputEdit = document.getElementById('eventDosageInputEdit');
var currentMonth;
var onLoad;
var ics;

function dateConvert(d) {
    const convertDate = new Date(d);
    const mm = '00' + (convertDate.getMonth() + 1).toString();
    const dd = convertDate.getDate().toString();
    const yyyy = convertDate.getFullYear().toString();

    return `${mm.substring(mm.length - 2)}/${dd}/${yyyy}`;
}

function timeConvert(t) {
    const convertTime = new Date(t);
    const hh = '00' + convertTime.getHours().toString();
    const mm = '00' + convertTime.getMinutes().toString();

    return `${hh.substring(hh.length - 2)}:${mm.substring(mm.length - 2)}`;
}

function loadTestData() {
    // Load local storage with test data
    if (localStorage.getItem('events') === null) {
        localStorage.setItem('events', JSON.stringify([
            { "title": "Paxil", "dose": "1 Pill", "date": 1665752400000, "freq": 1, "freqWhen": "freqHours" },
            { "title": "Viagra", "dose": "1 Pill", "date": 1665748800000, "freq": 1, "freqWhen": "freqHours" },
            { "title": "Concerta", "dose": "1 Pill", "date": 1665749700000, "freq": 1, "freqWhen": "freqHours" },
            { "title": "Aleve", "dose": "1 Pill", "date": 1665753300000, "freq": 1, "freqWhen": "freqHours" },
            { "title": "Focus Factor", "dose": "1 Pill", "date": 1665762600000, "freq": 1, "freqWhen": "freqHours" },
            { "title": "MultiVitamin", "dose": "1 Pill", "date": 1665763500000, "freq": 1, "freqWhen": "freqHours" }
        ])
        );
        location.reload();
    }
}

//Needed to delete or cancel the input for the displayed modal. This also takes into account the need for the input field to be cleared, 
//as it would save the input for the next time a modal was opened for the given day. 
function closeModal() {
    newEventModal.style.display = "none";
    deleteEventModal.style.display = "none";
    backDrop.style.display = "none";
    clicked = null;

    //Needed to clear output.
    while (outputStorage.firstChild) {
        outputStorage.removeChild(outputStorage.firstChild);
    }

    onLoad();
}

//Function to open pop up screen that allows the individual to enter perscription information. 
function openModal(date) {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    //If a perscription already exists on the given day, it will note a perscription is already entered for that day. 
    if (eventForDay) {
        deleteEventModal.style.display = 'block';
    } else {
        newEventModal.style.display = 'block';
    }
    backDrop.style.display = 'block';
}

function viewEvents(date) {

    clicked = date;

    const eventForDayFilter = events.filter(e => dateConvert(e.date) === clicked);
    const editSaveButton = document.getElementById('saveButtonEdit');

    for (let i = 0; i < eventForDayFilter.length; i++) {

        let eventText = document.createElement('h4');
        let eventDosage = document.createElement('p');
        let eventTime = document.createElement('p');
        let eventButton = document.createElement('button');


        eventButton.addEventListener('click', function (i) {
            newEventModal.style.display = 'none';
            deleteEventModal.style.display = 'block';
            eventTitleInputEdit.value = eventForDayFilter[i].title;
            eventDosageInputEdit.value = eventForDayFilter[i].dose;

        });

        editSaveButton.addEventListener('click', (i) => {

            for (const obj of this.events) {

                if (obj.title === eventForDayFilter[i].title) {
                    obj.title = eventTitleInputEdit.value;
                    obj.dose = eventDosageInputEdit.value;

                    break;
                }

            }
            this.closeModal();
        });

        eventButton.innerText = "Edit";
        eventText.innerText = eventForDayFilter[i].title;
        eventDosage.innerText = eventForDayFilter[i].dose;
        eventTime.innerText = timeConvert(eventForDayFilter[i].date);

        outputStorage.appendChild(eventText);
        outputStorage.appendChild(eventDosage);
        outputStorage.appendChild(eventTime);
        outputStorage.appendChild(eventButton);
    }

}

//On load display calendar
function onLoad() {

    //Create constant for Date object built into browser
    const date = new Date();

    //If nav counter is NOT on current month, then we need to ADD/SUBTRACT nav to the current month. 
    if (nav !== 0) {
        date.setMonth(new Date().getMonth() + nav);
    }

    //Create constants for calendar parameters needed to display
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    //Constant needed to grab the total days in the current month.
    //This one took me a while, so I'd like to explain the logic behind it. The year parameter is obviously the current year, 
    //however the month has a plus one due to the fact that we need to take advantage of the zero day parameter.
    //By moving the month parameter to the subsequent month, we can use the 0 day parameter (which represents the last day of the previous month) to get the amount of max days in a month. 
    //This is needed to know HOW many blocks we will need to create for the calendar to display correctly. 
    const maxDaysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfTheMonth = new Date(year, month, 1);

    //We need to make the weekday available for us to extract and use when determining how many days carry over to the layout from the previous month. 
    const dateString = firstDayOfTheMonth.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });

    //Extract the amount of days leftover from the previous month using split. 
    const leftoverDays = weekdays.indexOf(dateString.split(',')[0]);

    //Needed to refresh the calendar div upon using the nav buttons. W/O this another calendar would generate below the first one, etc.
    calendar.innerHTML = '';

    //Actually generating the calendar on the screen. The for statement also takes into account the days that are leftover, not just the days in this month. 
    for (let i = 1; i <= leftoverDays + maxDaysInMonth; i++) {
        //Creating the box for the day.
        const dayBox = document.createElement('div');
        //Class add to denote what CSS style to use for rendering.
        dayBox.classList.add('day');

        const dayString = `${month + 1}/${i - leftoverDays}/${year}`;

        //The if statement takes into account the padding days, and whether we should render an actual day or an "empty" day. By looking at the leftover days we can determine this. 
        //We are also adding a click event to each rendered "actual" day, so that we can add medication information as well as adding events at particular times.
        if (i > leftoverDays) {
            dayBox.innerText = i - leftoverDays;

            const eventForDay = events.filter(e => this.dateConvert(e.date) === dayString);

            if (eventForDay.length) {
                eventForDay.sort(function (a, b) { return a.date - b.date; });
                let remainingEvents = 0;
                if (eventForDay.length > 3) {
                    remainingEvents = eventForDay.length - 3;
                }
                for (let z = 0; z < eventForDay.length; z++) {
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add(z !== 3 ? 'event' : 'moreEvents');
                    eventDiv.innerText = z === 3 ? '+' + remainingEvents.toString() + ' more events' : timeConvert(eventForDay[z].date) + '-' + eventForDay[z].title;
                    dayBox.appendChild(eventDiv);
                    if (z === 3) {
                        break;
                    }
                }
            }
            dayBox.addEventListener('click', () => this.openModal(dayString));
            dayBox.addEventListener('click', () => this.viewEvents(dayString));
        } else {
            //Class add to denote that this day should NOT be rendered. 
            dayBox.classList.add('blank');
        }
        //Add day that we are on (in the for)to actual calendar div. 
        calendar.appendChild(dayBox);
    }

    //Split date to display month and year in the header div.
    document.getElementById('monthDisplay').innerText = `${date.toLocaleDateString('en-us', { month: "long" })} ${year}`;
    currentMonth = date;
}

function addEvent() {
    if (eventTitleInputEdit.value && eventDosageInputEdit.value) {
        eventTitleInputEdit.classList.remove('error');
        eventDosageInputEdit.classList.remove('error');

        events.push({ title: eventTitleInputEdit.value, dose: eventDosageInputEdit.value });

        localStorage.setItem('events', JSON.stringify(events));

        closeModal();
    } else {
        eventTitleInputEdit.classList.add('error');
        eventDosageInputEdit.classList.add('error');
    }
}

function deleteEvent() {

    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();

}

function monthICS() {
    let cal = ics();

    // Get the Month start date, and end date
    let startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    let endOfMonth = new Date(new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0).getTime() + (24 * 60 * 60 * 1000 - 1));

    let monthEvents = events.filter(function (event) { return event.date >= startOfMonth.getTime() && event.date <= endOfMonth.getTime(); });
    console.log(monthEvents);

    // Add Medication event to ICS file
    for (let i = 0; i < monthEvents.length; i++) {
        cal.addEvent('Take ' + monthEvents[i].title, monthEvents[i].title + ' - ' + monthEvents[i].dose, '', monthEvents[i].date, monthEvents[i].date + 300000);
    }

    // Create file name, and download the ics file
    let icsDate = 'Calendar_' + (Number(new Date().getMonth()) + 1).toString() + '_' +
        new Date().getDate().toString() + '_' + new Date().getFullYear().toString().substring(2, 4) +
        '_' + new Date().getHours().toString() + '_' + new Date().getMinutes().toString() +
        '_' + new Date().getSeconds().toString();
    cal.download(icsDate);

}

//Add event listeners to buttons, and call load again. Increment/Decrement the global nav variable to navigate the months properly. 
function initButtons() {
    document.getElementById('monthICS').addEventListener('click', monthICS);
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        onLoad();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        onLoad();
    });

    document.getElementById('cancelButton').addEventListener('click', closeModal);

    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);


}

loadTestData();
initButtons();
onLoad();