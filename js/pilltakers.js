/* jshint curly: true, esversion: 6, eqeqeq: true, latedef: true, laxbreak: true */
// account.html JS Code Start
function createAccount() {
    var userEmail = document.getElementById("emailtext").value;
    var userFirstName = document.getElementById("firstnametext").value;
    var userLastName = document.getElementById("lastnametext").value;
    var message = '';

    message = "Thank You " + userFirstName + " " + userLastName + "! Please check " + userEmail + " for your first reminder.";

    document.getElementById("message").innerHTML = message;

} // end createAccount()
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
        Array.prototype.forEach.call(el, function (node) {
            node.parentNode.removeChild(node);
        });
    }
}

function saveMeds() {
    const medList = document.querySelectorAll('.meds');

    //Create local storage for medications
    localStorage.clear();
    localStorage.setItem('medicineList', '[]');
    for (let i = 0; i < medList.length; i++) {
        let medNameText;
        let dosText;
        let dateTimeText = 0;
        let freqNumber = 0;
        let freqTime;

        for (let j = 0; j < medList[i].childNodes.length; j++) {
            let childObj = medList[i].childNodes[j];
            if (childObj.nodeName !== 'INPUT' && childObj.nodeName !== 'DIV') {
                continue;
            }
            if (childObj.id === 'medNameText') {
                medNameText = childObj.value;
                continue;
            }
            if (childObj.id === 'doseText') {
                dosText = childObj.value;
                continue;
            }
            if (childObj.id === 'dateTimeText') {
                dateTimeText = childObj.valueAsNumber;
                continue;
            }
            if (childObj.className === 'tabBlock'){
                for (let k = 0; k < childObj.childNodes.length; k++) {
                    let subChildObj = childObj.childNodes[k];
                    if (subChildObj.nodeName !== 'INPUT' && subChildObj.nodeName !== 'SELECT') {
                        continue;
                    }
                    if (subChildObj.id === 'freqNumber') {
                        freqNumber = subChildObj.value;
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
    }

    alert('You have added ' + (medList.length ? medList.length : '0') + (medList.length === 1 ? ' medication' : ' medications'));
}

function improperInput(inField) {
    alert('Please enter a medication number greater than 0');
    inField.value = '';
    return;
}

if (medNbr) {
    medNbr.addEventListener('keyup', function () {
        // Determine if a integer was entered for medication count
        if (isNaN(medNbr.value) || medNbr.value < 0) {
            return improperInput(medNbr);
        }
        if (medNbr.value !== '' && medNbr.value !== currentSelect) {
            currentSelect = medNbr.value;
            loadNbr = medNbr.value;
            window.onload = meds(loadNbr);
        }
    });
}
// medications.html JS Code End
