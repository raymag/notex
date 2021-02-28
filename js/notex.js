const noteLibrary = [
    {
        1: 'mí',
        2: 'ré',
        3: 'dó'
    },
    {
        1: 'sol',
        2: 'fá',
        3: 'mí'
    },
    {
        1: 'sí',
        2: 'lá',
        3: 'sol'
    },
    {
        1: 'ré',
        2: 'dó',
        3: 'sí'
    },
    {
        1: 'fá',
        2: 'mí',
        3: 'ré'
    },
]
const correctFx = new Audio('./sound/correct.mp3');
const wrongFx = new Audio('./sound/quack.mp3');
let currentNote = '';
let lastNote = '';
let answered = false;
let scoreRight = 0;
let scoreWrong = 0;



async function doRandomQuestion() {
    clearPentagram();
    await new Promise(() => setTimeout(addRandomNote, 2000));
}

function clearPentagram() {
    console.log('[Clearing Pentagram]');
    for(let i=1;i<=5;i++){
        const line = document.querySelector(`#l${i}`);
        line.innerHTML = "";
    }
}

function generateRandomNote(){
    console.log('[Generating Random Note]');

    lastNote = currentNote;
    const i = Math.floor(Math.random() * 5) + 1;
    const line = document.querySelector(`#l${i}`);
    const level = Math.floor(Math.random()*3) + 1;
    currentNote = noteLibrary[i-1][level];

    console.log(`>> Line: ${i}\n>> Level: ${level}`);
    console.log(`>> Note: ${currentNote}\n>> Last Note: ${lastNote}`);
    
    return {line, level};
}

function addRandomNote(){
    let generatedNote = generateRandomNote();

    while (lastNote === currentNote){
        generatedNote = generateRandomNote();
    }

    const line = generatedNote.line;
    const level = generatedNote.level;

    console.log('[Adding Random Note]');

    const note = document.createElement("span");
    switch(level){
        case 1: 
            note.classList.add('note', 'note-up');
            break;
        case 2:
            note.classList.add('note');
            break;
        case 3:
            note.classList.add('note', 'note-down');
            break;
    }
    line.appendChild(note);
    answered = false;
}

function validateAnswer(){
    if (!answered) {
        answered = true;
        console.log('[Validating Answer]');
        
        const input = document.querySelector('#note-input').value;
        
        console.log(`>> User\'s input: ${input}`);
        console.log(`>> Correct Answer: ${currentNote}`);
        
        let cleanInput = input.toLowerCase().replace('fa', 'fá').replace('mi', 'mí').replace('re', 'ré').replace('si', 'sí').replace('do', 'dó').replace('la', 'lá');
        if (cleanInput === currentNote){
            console.log(">> Correct!");
            scoreRight++;
            correctFx.play()
        } else {
            console.log(">> Wrong!");
            scoreWrong++;
            wrongFx.play()
        }
        updateScore();
        doRandomQuestion();
    }
}

function updateScore(){
    console.log('[Updating Score]');

    const wrong = document.querySelector("#score-wrong");
    wrong.innerText = scoreWrong;

    const right = document.querySelector("#score-correct");
    right.innerText = scoreRight;
}

function start(){
    console.log('[Starting]');
    const input = document.querySelector('#note-input');
    input.addEventListener('keyup', (e) => {
        let key = e.which || e.keyCode;
        if (key === 13){
            validateAnswer();
        }
    })
    doRandomQuestion();
}

start();
