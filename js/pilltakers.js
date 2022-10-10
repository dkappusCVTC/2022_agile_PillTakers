/* jshint curly: true, esversion: 6, eqeqeq: true, latedef: true, laxbreak: true */
// account.html JS Code Start
function newUser(uname, pwd, fname, lname, e_mail, icon) {
    this.uname = uname;
    this.pwd = pwd;
    this.fname = fname;
    this.lname = lname;
    this.e_mail = e_mail;
    this.icon = icon;
}

var acctNumber = 0;
var accounts = [];

function createAccount() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var userEmail = document.getElementById("emailtext").value;
    var userFirstName = document.getElementById("firstnametext").value;
    var userLastName = document.getElementById("lastnametext").value;
    var message = '';
    
    changeIcon();
    
    accounts[acctNumber] = new newUser(username, password, userFirstName, userLastName, userEmail, mainIcon);
    acctNumber++;
    localStorage.setItem("accountNumber", accounts);

    message = "Thank You " + userFirstName + " " + userLastName + "! Please check " + userEmail + " for your first reminder.";

    document.getElementById("message").innerHTML = message;

} // end createAccount()
// choose profile icon
var mainIcon = document.getElementById("mainicon");
  var icons = document.getElementById("icons");
  var value = icons.value;
  var text = icons.options[icons.selectedIndex].text;

// fix this
function changeIcon() {
  if (icons.options[icons.selectedIndex].text == "007") {
    mainIcon.src = "/images/007.jpg";
  } else if (icons.options[icons.selectedIndex].text == "Afro") {
    mainIcon.src = "/images/Afro.png";
  } else if (icons.options[icons.selectedIndex].text == "Clown") {
    mainIcon.src = "/images/Clown.png";
  } else if (icons.options[icons.selectedIndex].text == "Cowboy") {
    mainIcon.src = "/images/Cowboy.png";
  } else if (icons.options[icons.selectedIndex].text == "Doctor") {
    mainIcon.src = "/images/Doctor.png";
  } else if (icons.options[icons.selectedIndex].text == "Elvis") {
    mainIcon.src = "/images/Elvis.png";
  } else if (icons.options[icons.selectedIndex].text == "FatherXmas") {
    mainIcon.src = "/images/FatherXmas.png";
  } else if (icons.options[icons.selectedIndex].text == "Ghost") {
    mainIcon.src = "/images/Ghost.png";
  } else if (icons.options[icons.selectedIndex].text == "Pirate") {
    mainIcon.src = "/images/Pirate.png";
  } else if (icons.options[icons.selectedIndex].text == "Policeman") {
    mainIcon.src = "/images/Policeman.png";
  } else if (icons.options[icons.selectedIndex].text == "Superhero") {
    mainIcon.src = "/images/Superhero.png";
  } else if (icons.options[icons.selectedIndex].text == "TeddyBear") {
    mainIcon.src = "/images/TeddyBear.png";
  } else {
    mainIcon.src = "/images/add-user.png";
  }
}

// account.html JS Code End

// medications.html JS Code Start
var medNbr = document.getElementById('medNumberText');
var loadNbr = 0;
var currentSelect = 0;

function meds(inNbr) {
    if (inNbr !== 0) {
        // Remove all form elements, to clear the page
        const el = document.querySelectorAll('.meds');
        Array.prototype.forEach.call(el, function (node) {
            node.parentNode.removeChild(node);
        });
        var counter = 0;
        let countMed = Number(counter) + Number(inNbr);
        for (let i = counter; i < countMed; i++) {
            // Clones the template to an object variable
            var newMeds = document.getElementById('medTemplate').cloneNode(true);
            // Sets new DIV id's and class for each medication form
            newMeds.id = 'newMed' + counter;
            newMeds.className = 'meds';
            // Changes the style of Medication form so that it can be visible when inserted
            newMeds.style.display = 'block';
            var newMed = newMeds.childNodes;
            // Loop to change the names of the elements to append the medication number
            for (var j = 0; j < newMed.length; j++) {
                var theName = newMed[j].name;
                if (theName) {
                    newMed[j].name = theName + counter;
                }
                if (newMed[j].id === 'medNbrText') {
                    newMed[j].innerHTML = 'Medication #' + (Number(counter) + 1);
                    newMed[j].innerText = 'Medication #' + (Number(counter) + 1);
                }
                if (newMed[j].type === 'button' && newMed[j].value === 'Remove Medication') {
                    newMed[j].value = newMed[j].value + ' #' + (Number(counter) + 1);
                }
            }
            var insertHere = document.getElementById('medFields');
            // Adds the Medication form to the page
            insertHere.parentNode.insertBefore(newMeds, insertHere);
            counter++;
        }

    } else {
        // Remove all form elements, to clear the page
        const el = document.querySelectorAll('.meds');
        if (Object.keys(el).length) {
            Array.prototype.forEach.call(el, function (node) {
                node.parentNode.removeChild(node);
            });
        } 
    }
}

function improperInput(inField) {
    if (inField.MedNumber === 'medNbr') {
        alert('Number of Medications must be greater than 0');
    } else {
        alert('Missing required information:\n' + inField.MedNumber + ' - "' + inField.Field + '" is missing!');
    }
    return;
}

function processMeds(request) {
    // Check if the user entered a valid number in the 'Number of medications' field
    if (medNbr.value === '') {
        return improperInput({ 'MedNumber': 'medNbr', 'Field': 'Number of Medications' });
    }

    const medList = document.querySelectorAll('.meds');


    

    //Create local storage for medications
    localStorage.clear();
    localStorage.setItem('medicineList', '[]');
    let cal = ics();
    for (let i = 0; i < medList.length; i++) {
        let medNameText;
        let dosText;
        let dateTimeText = 0;
        let freqNumber = 0;
        let freqTime;

        for (let j = 0; j < medList[i].childNodes.length; j++) {
            let childObj = medList[i].childNodes[j];
            let medListNbr = medList[i].id.replace(/\D/g, '');
            if (childObj.nodeName !== 'INPUT' && childObj.nodeName !== 'DIV') {
                continue;
            }
            if (childObj.id === 'medNameText') {
                if (childObj.value !== '') {
                    medNameText = childObj.value;
                    continue;
                } else {
                    let medForm = 'Medication #' + (Number(medListNbr) + 1).toString();
                    return improperInput({ 'MedNumber': medForm, 'Field': 'Medication Name' });
                }

                
            }
            if (childObj.id === 'doseText') {
                if (childObj.value !== '') {
                    dosText = childObj.value;
                    continue;
                } else {
                    let medForm = 'Medication #' + (Number(medListNbr) + 1).toString();
                    return improperInput({ 'MedNumber': medForm, 'Field': 'Dosage' });
                }
                
            }
            if (childObj.id === 'dateTimeText') {
                if (!isNaN(childObj.valueAsNumber)) {
                    let unconvertedTime = new Date(childObj.valueAsNumber);
                    dateTimeText = new Date(unconvertedTime.getTime() + (unconvertedTime.getTimezoneOffset() * 60 * 1000)).getTime();
                    continue;
                } else {
                    let medForm = 'Medication #' + (Number(medListNbr) + 1).toString();
                    return improperInput({ 'MedNumber': medForm, 'Field': 'When to take it' });
                }
            }
            if (childObj.className === 'tabBlock'){
                for (let k = 0; k < childObj.childNodes.length; k++) {
                    let subChildObj = childObj.childNodes[k];
                    if (subChildObj.nodeName !== 'INPUT' && subChildObj.nodeName !== 'SELECT') {
                        continue;
                    }
                    if (subChildObj.id === 'freqNumber') {
                        if (subChildObj.value !== '') {
                            freqNumber = Number(subChildObj.value);
                            continue;
                        } else {
                            let medForm = 'Medication #' + (Number(medListNbr) + 1).toString();
                            return improperInput({ 'MedNumber': medForm, 'Field': 'How often it needs to be taken' });
                        }
                    }
                    if (subChildObj.id === 'freqTime') {
                        freqTime = subChildObj.value;
                    }
                    if (freqNumber && freqTime) {
                        break;
                    }
                }
            }
            if (medNameText && dosText && dateTimeText && freqNumber && freqTime) {
                break;
            }
        }

        let old_data = JSON.parse(localStorage.getItem('medicineList'));
        old_data.push([i, medNameText, dosText, dateTimeText, freqNumber, freqTime]);
        localStorage.setItem('medicineList', JSON.stringify(old_data));

        let freqArray = [];
        if (freqTime === 'freqHours') {
            let time = dateTimeText;
            // Days, Hours, Minutes, Seconds, Milliseconds
            let week = time + 7 * 24 * 60 * 60 * 1000;
            let hours = freqNumber * 60 * 60 * 1000;
            while (week - time >= hours) {
                freqArray.push(time);
                time += hours;
            }
        } else if (freqTime === 'freqDays') {
            let time = dateTimeText;
            // Days, Hours, Minutes, Seconds, Milliseconds
            let week = time + 7 * 24 * 60 * 60 * 1000;
            let days = freqNumber * 24 * 60 * 60 * 1000;
            while (week - time >= days) {
                freqArray.push(time);
                time += days;
            }
        } else if (freqTime === 'freqWeeks') {
            let time = dateTimeText;
            // Month in Milliseconds
            let month = new Date(time).setMonth(new Date(time).getMonth() + 2);
            let weeks = freqNumber * 7 * 24 * 60 * 60 * 1000;
            while (month - time >= weeks) {
                freqArray.push(time);
                time += weeks;
            }
        } else {
            let time = dateTimeText;
            let year = new Date(time).setFullYear(new Date(time).getFullYear() + 1);
            let month = new Date(time).setMonth(new Date(time).getMonth() + freqNumber);
            while (month - time <= year - time) {
                freqArray.push(time);
                time = month;
                month = new Date(time).setMonth(new Date(time).getMonth() + freqNumber);
                
            }
        }

        // Add Medication event to ICS file
        for (let i = 0; i < freqArray.length; i++) {
            cal.addEvent('Take ' + medNameText, medNameText + ' - ' + dosText, '', freqArray[i], freqArray[i] + 300000);
        }
        
    }

    if (request === 'saveMed') {
        alert('You have added ' + medList.length + ' medications');
    } else if (request === 'createICS') {
        let icsDate = 'Calendar_' + (Number(new Date().getMonth()) + 1).toString() + '_' +
            new Date().getDate().toString() + '_' + new Date().getFullYear().toString().substring(2, 4) +
            '_' + new Date().getHours().toString() + '_' + new Date().getMinutes().toString() +
            '_' + new Date().getSeconds().toString();
        cal.download(icsDate);
    }
    
}

if (medNbr) {
    medNbr.addEventListener('keyup', function () {
        // Determine if a integer was entered for medication count
        if (medNbr.value === '') {
            window.onload = meds(0);
        }
        if (medNbr.value !== '' && medNbr.value !== currentSelect) {
            currentSelect = medNbr.value;
            loadNbr = medNbr.value;
            window.onload = meds(loadNbr);
        }
    });
}
// medications.html JS Code End
