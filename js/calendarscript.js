//Variables housed here are meant to capture localstorage events.
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

//Weekdays constant array is needed to help determine the amount of days leftover from the previous month.
const weekdays = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const deleteEventModal = document.getElementById('deleteEventModal');

//On load display calendar
function onLoad() {

    //Create constant for Date object built into browser
    const date = new Date();

    //If nav counter is NOT on current month, then we need to ADD/SUBTRACT nav to the current month. 
    if (nav !== 0){
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
    const firstDayOfTheMonth = new Date(year, month, 1)

    //We need to make the weekday available for us to extract and use when determining how many days carry over to the layout from the previous month. 
    const dateString = firstDayOfTheMonth.toLocaleDateString('en-us',{weekday:'long',year:'numeric',month:'numeric',day:'numeric'})

    //Extract the amount of days leftover from the previous month using split. 
    const leftoverDays = weekdays.indexOf(dateString.split(',')[0]);

    //Needed to refresh the calendar div upon using the nav buttons. W/O this another calendar would generate below the first one, etc.
    calendar.innerHTML = '';

    //Actually generating the calendar on the screen. The for statement also takes into account the days that are leftover, not just the days in this month. 
    for(let i = 1; i <= leftoverDays + maxDaysInMonth; i++){
        //Creating the box for the day.
        const dayBox = document.createElement('div');
        //Class add to denote what CSS style to use for rendering.
        dayBox.classList.add('day');

        const dayString = `${month + 1}/${i - leftoverDays}/${year}`;

        //The if statement takes into account the padding days, and whether we should render an actual day or an "empty" day. By looking at the leftover days we can determine this. 
        //We are also adding a click event to each rendered "actual" day, so that we can add medication information as well as adding events at particular times.
        if(i > leftoverDays){
            dayBox.innerText = i - leftoverDays;

            const eventForDay = events.find(e => e.date === dayString);

            if(eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                dayBox.appendChild(eventDiv);
            }

            dayBox.addEventListener('click',() => openModal(dayString));
        }else{
            //Class add to denote that this day should NOT be rendered. 
            dayBox.classList.add('blank');
        }
        //Add day that we are on (in the for)to actual calendar div. 
        calendar.appendChild(dayBox);
    }

    console.log(leftoverDays);

    //Split date to display month and year in the header div.
    document.getElementById('monthDisplay').innerText = `${date.toLocaleDateString('en-us',{month:"long"})} ${year}`;
}


//Needed to delete or cancel the input for the displayed modal. This also takes into account the need for the input field to be cleared, 
//as it would save the input for the next time a modal was opened for the given day. 
function closeModal(){
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = "none";
    deleteEventModal.style.display = "none";
    backDrop.style.display = "none";
    eventTitleInput.value = '';
    clicked = null;
    onLoad();
}

//Needed to add modal event to array of events, or localStorage 
function saveEvent(){
    if(eventTitleInput.value){
        eventTitleInput.classList.remove('error');

        events.push({date:clicked,title:eventTitleInput.value,});

        localStorage.setItem('events',JSON.stringify(events));
        closeModal();
    }else{
        eventTitleInput.classList.add('error');
    }
}

function deleteEvent(){
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

//Add event listeners to buttons, and call load again. Increment/Decrement the global nav variable to navigate the months properly. 
function initButtons(){
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        onLoad();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        onLoad();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);

    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);

}
//Function to open pop up screen that allows the individual to enter perscription information. 
function openModal(date){
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    //If a perscription already exists on the given day, it will note a perscription is already entered for that day. 
    if(eventForDay){
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display = 'block';
    }else{
        newEventModal.style.display = 'block';
    }
    backDrop.style.display = 'block';
}
initButtons();
onLoad();