// account.html JS Code Start
function createAccount() {
    var userEmail = document.getElementById("emailtext").value;
    var userFirstName = document.getElementById("firstnametext").value;
    var userLastName = document.getElementById("lastnametext").value;

    message = "Thank You " + userFirstName + " " + userLastName + "! Please check " + userEmail + " for your first reminder.";

    document.getElementById("message").innerHTML = message;

} // end createAccount()
// account.html JS Code End

// medications.html JS Code Start
var medNbr = document.getElementById('medNumberText');
var loadNbr = 0;
var currentSelect = 0;
medNbr.addEventListener('keyup', function () {
    // Determine if a integer was entered for medication count
    if (isNaN(medNbr.value) || medNbr.value < 0) return improperInput(medNbr);
    if (medNbr.value != '' && medNbr.value != currentSelect) {
        currentSelect = medNbr.value;
        loadNbr = medNbr.value;
        window.onload = meds(loadNbr);
    }
});

function meds(inNbr) {
    if (inNbr != 0) {
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
                if (theName) newMed[j].name = theName + counter;
                if (newMed[j].htmlFor == 'medNbrText') {
                    newMed[j].innerHTML = 'Medication #' + (Number(counter) + 1);
                    newMed[j].innerText = 'Medication #' + (Number(counter) + 1);
                }
                if (newMed[j].type == 'button' && newMed[j].value == 'Remove Medication') newMed[j].value = newMed[j].value + ' #' + (Number(counter) + 1);
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
    alert('You have added ' + (medList.length ? medList.length : '0') + (medList.length == 1 ? ' medication' : ' medications'));
}

function improperInput(inField) {
    alert('Please enter a medication number greater than 0');
    inField.value = '';
    return;
}
// medications.html JS Code End
