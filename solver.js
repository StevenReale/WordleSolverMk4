let currentAnswerState;
let knownLetterBlanks = 0;
let ruledOutLetterBlanks = 0;
let ruledOut;


// function populateAnswer() {

//    currentAnswerState = {};

//    const blanks = document.querySelectorAll("#answer-blanks li");
//    for (let blank of blanks) {
//        blank.innerText = "";
//    }
//    const entry = this.value;

//    for (let i = 0; i < entry.length; i++) {
//        let currentLetter = entry.substring(i, i + 1).toUpperCase();
//        if (currentLetter.match(/[A-Za-z]/)) {
//            blanks[i].innerText = currentLetter;
//            currentAnswerState[i] = currentLetter;
//        }

//    }

// }

function getCurrentAnswer() {

    function saveInputValues() {
        currentAnswerState = {};

        const firstValue = document.getElementById("first").value;
        const secondValue = document.getElementById("second").value;
        const thirdValue = document.getElementById("third").value;
        const fourthValue = document.getElementById("fourth").value;
        const fifthValue = document.getElementById("fifth").value;
    
        const values = [firstValue, secondValue, thirdValue, fourthValue, fifthValue];
        for (let i = 0; i < values.length; i++) {
            let currentLetter = values[i].toUpperCase();
            if (currentLetter.match(/[A-Za-z]/)) {
            currentAnswerState[i] = currentLetter;
            }
        }
    }

    let inputs = document.getElementsByClassName("new");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("keyup", saveInputValues);
    }
}

function getRuledOutLetters() {
    function saveRuledOutInput() {
        ruledOut = [];


    }
}

function addRuledOutInput() {
    ruledOutLetterBlanks++;
    console.log(ruledOutLetterBlanks);

    const ruledOutInputs = document.getElementById('ruled-out-letter-inputs');
    const ruledOutSection = document.getElementById('ruled-out');
    const ruledOutDiv = document.createElement('div');
    ruledOutDiv.classList.add("ruled-out-div");
    ruledOutInputs.appendChild(ruledOutDiv);
    
    const newInput = document.createElement('input');
    newInput.classList.add('new-ruled');
    newInput.setAttribute("type", "text");
    newInput.setAttribute("maxlength", "1");
    newInput.id = "ruled-out-" + ruledOutLetterBlanks;
    ruledOutDiv.appendChild(newInput);
    
    //create delete button
    const deleteRuledBtn = document.createElement('button');
    deleteRuledBtn.innerText = '-';
    deleteRuledBtn.classList.add("ruled-out-minus");
    ruledOutDiv.appendChild(deleteRuledBtn);
    deleteRuledBtn.addEventListener('click', () => {
        newInput.remove();
        deleteRuledBtn.remove();
        });

}

// Changes input color when letter is entered
function handleInputChange(event) {
    const input = event.target;
  
    if (input.value.length > 0) {
      input.classList.add("valid"); // Add 'valid' class if value is entered
    } else {
      input.classList.remove("valid"); // Remove 'valid' class if value is empty
    }
  }

function search() {

    const knowns = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        "fullList": []
    }

    if (currentAnswerState == undefined) return;

    const ruledOutLetters = document.getElementById('ruled-out-letters');
    let ruledOut = ruledOutLetters.value.toUpperCase().split('');
    console.log(ruledOut);

    let possibleAnswers = [];
    const knownLetterDivs = document.querySelectorAll('.known');

    for (thisDiv of knownLetterDivs) {
        const divId = (Number.parseInt(thisDiv.getAttribute('id').substring(3)));
        const divLetter = document.getElementById('known-letter-blank-' + divId).value.toUpperCase();
        const checkboxes = document.querySelectorAll(".letter-not-in-" + divId);
        for (checkbox of checkboxes) {
            if (checkbox.checked) {
                knowns[checkbox.name].push(divLetter);
                knowns["fullList"].push(divLetter);
            }
        }

    }

    for (let word of wordlist) {
        let found = true;

        for (let i = 0; i < 5; i++) {
            let wordLetter = word.substring(i, i + 1).toUpperCase();

            let letterFound = true;

            if (knowns['fullList'].length > 0) {


                for (let includeLetter of knowns['fullList']) {

                    if (!word.toUpperCase().split('').includes(includeLetter)) {
                        letterFound = false;
                    }
                }
            }


            if (!letterFound || ruledOut.includes(wordLetter) || knowns[i].includes(wordLetter)) {
                found = false;
                continue;
            }

            if (currentAnswerState[i] == null || ruledOut.includes(wordLetter)) {
                continue;
            }


            if (wordLetter !== currentAnswerState[i]) {
                found = false;
                break;

            }

        }
        if (found) {
            possibleAnswers.push(word);
        }
    }

    const answers = document.getElementById('answers');
    answers.innerHTML = ' ';
    for (let word of possibleAnswers) {
        const newEntry = document.createElement('li');
        newEntry.innerText = word;
        answers.appendChild(newEntry);
    }

}

function addKnownLetterBlank() {
    knownLetterBlanks++;

    const knownLetterSection = document.getElementById('known-letters');

    //create new div to house new blanks
    const blankSectionButton = document.getElementById('new-known-letter-blank');
    const letterDiv = document.createElement('div');
    letterDiv.id = "div" + knownLetterBlanks;
    letterDiv.classList.add('known');
    blankSectionButton.insertAdjacentElement("beforebegin", letterDiv);

    //create label for letter input
    const letterLabel = document.createElement('div');
    const label = "known-letter-blank-" + knownLetterBlanks;
    letterLabel.setAttribute("for", label);
    letterLabel.id = "section-label";
    letterLabel.innerText = "Input next known letter: ";
    letterDiv.appendChild(letterLabel);

    //create row items div
    const rowDiv = document.createElement('div');
    rowDiv.id = "row-items";
    letterDiv.appendChild(rowDiv);

    //create letter input
    const letter = document.createElement('input');
    letter.classList.add('known-letter');
    letter.name = label;
    letter.id = label;
    letter.type = 'text';
    rowDiv.appendChild(letter);

    //create label for blanks input
    const blanksLabel = document.createElement('div');
    const labelForBlank = "letter-not-in-" + knownLetterBlanks;
    blanksLabel.id = "select-label";
    blanksLabel.setAttribute("for", labelForBlank);
    blanksLabel.innerText = 'Select blanks where it is known that this letter does not appear: ';

    // create div for label & checkboxes
    const checkDiv = document.createElement('div');
    checkDiv.id = "select-checks";
    rowDiv.appendChild(checkDiv);
    checkDiv.appendChild(blanksLabel);

    // create div for checkboxes
    const justChecks = document.createElement('div');
    justChecks.id = "just-checks";
    checkDiv.appendChild(justChecks);

    //create blanks input
    for (let i = 0; i < 5; i++) {
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.classList.add(labelForBlank, 'check-boxes');
        check.name = i;
        justChecks.appendChild(check);
    }

    //create delete & plus div
    const buttonDiv = document.createElement('div');
    buttonDiv.id = "plus-minus";
    rowDiv.appendChild(buttonDiv);

    // if statement so that a user can't get rid of the next known letter div altogether 
    // it just looks silly w/o it
    if (knownLetterBlanks > 1) {
        //create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = '-';
        deleteBtn.id = "minus";
        buttonDiv.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', () => letterDiv.remove());
    }

}

function useModel() {
    // Get the model
    let model = document.getElementById("myModel");

    // Get the button that opens the model
    let btn = document.getElementById("myBtn");

    // Get the <span> element that closes the model
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the model
    btn.onclick = function () {
        model.style.display = "block";
    }

    // When the user clicks on <span> (x), close the model
    span.onclick = function () {
        model.style.display = "none";
    }

    // When the user clicks anywhere outside of the model, close it
    window.onclick = function (event) {
        if (event.target == model) {
            model.style.display = "none";
        }
    }
}



document.addEventListener('DOMContentLoaded', () => {

    const current = document.getElementById('current');
    const newcurrent = document.getElementById('new-blanks');
    const searchBtn = document.getElementById('search');
    const blanksBtn = document.getElementById('new-known-letter-blank');
    const ruledOutBtn = document.getElementById('ruled-out-button');
    // current.addEventListener("keyup", populateAnswer);
    newcurrent.addEventListener("keyup", getCurrentAnswer);
    searchBtn.addEventListener('click', search);
    blanksBtn.addEventListener('click', addKnownLetterBlank);
    ruledOutBtn.addEventListener('click', addRuledOutInput);
    addKnownLetterBlank();
    useModel();


    const inputs = document.getElementsByClassName("new");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("input", handleInputChange);
    }

});