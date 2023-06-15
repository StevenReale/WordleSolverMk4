let currentAnswerState;
let knownLetterBlanks = 0;



function populateAnswer() {

    currentAnswerState = {};

    const blanks = document.querySelectorAll("#answer-blanks li");
    for (let blank of blanks) {
        blank.innerText = "";
    }
    const entry = this.value;

    for(let i=0; i<entry.length; i++) {
        let currentLetter = entry.substring(i, i+1).toUpperCase();
        if (currentLetter.match(/[A-Za-z]/)) {
            blanks[i].innerText = currentLetter;
            currentAnswerState[i] = currentLetter;
        }

    }

}

function search() {
    //if (currentAnswerState == undefined) return;
    let possibleAnswers = [];
    const knownLetterDivs = document.querySelectorAll('.known');
    const knowns = {};

    for (thisDiv of knownLetterDivs) {
        const divId = (Number.parseInt(thisDiv.getAttribute('id').substring(3)));
        const checkboxes = document.querySelectorAll("#letter-not-in" + divId);
        console.log(checkboxes);
    }

    for (let word of wordlist) {
        let found = true;
        for (let i = 0; i < 5; i++) {
            if (currentAnswerState[i] == null) {
                continue;
            }
            if (word.substring(i, i+1).toUpperCase() !== currentAnswerState[i]) {
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

    //create new div to house new blanks
    const blankSectionButton = document.getElementById('new-known-letter-blank');
    const letterDiv = document.createElement('div');
    letterDiv.id = "div" + knownLetterBlanks;
    letterDiv.classList.add('known');
    blankSectionButton.insertAdjacentElement("beforebegin", letterDiv);

    //create label for letter input
    const letterLabel = document.createElement('label');
    const label = "known-letter-blank-" + knownLetterBlanks;
    letterLabel.setAttribute("for", label);
    letterLabel.innerText = "Input next known letter: ";
    letterDiv.appendChild(letterLabel);

    //create letter input
    const letter = document.createElement('input');
    letter.classList.add('known-letter');
    letter.name = label;
    letter.id = label;
    letter.type = 'text';
    letterDiv.appendChild(letter);

    //create label for blanks input
    const blanksLabel = document.createElement('label');
    const labelForBlank = "letter-not-in-" + knownLetterBlanks;
    blanksLabel.setAttribute("for", labelForBlank);
    blanksLabel.innerText = 'Select blanks where it is known that this letter does not appear: ';
    letterDiv.appendChild(blanksLabel);

    //create blanks input
    for (let i = 0; i < 5; i++) {
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.id = labelForBlank;
        check.name = i;
        letterDiv.appendChild(check);
    }

    //create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '-';
    letterDiv.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => letterDiv.remove());
    
    


}


document.addEventListener('DOMContentLoaded', () => {

    const current = document.getElementById('current');
    const searchBtn = document.getElementById('search');
    const blanksBtn = document.getElementById('new-known-letter-blank');
    current.addEventListener("keyup", populateAnswer);
    searchBtn.addEventListener('click', search);
    blanksBtn.addEventListener('click', addKnownLetterBlank);
    addKnownLetterBlank();

});