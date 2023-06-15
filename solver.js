let currentAnswerState;


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
    let possibleAnswers = [];
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

function useModal() {
    // Get the modal
    let modal = document.getElementById("myModal");

    // Get the button that opens the modal
    let btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
         modal.style.display = "none";
}

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
}


document.addEventListener('DOMContentLoaded', () => {

    // wordList.push([...readfile("data/wordle-LA.txt")]);
    // console.log(wordList);
    const current = document.getElementById('current');
    const btn = document.getElementById('search');
    current.addEventListener("keyup", populateAnswer);
    btn.addEventListener('click', search);
    useModal();

});