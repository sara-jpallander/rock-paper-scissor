document.addEventListener("DOMContentLoaded", function() {

    // Variabler för att läsa in elementen från HTML filen. 
    const startWindow = document.querySelector('.start-window');
    const gameWindow = document.querySelector('.game-window');
    const startBtn = document.getElementById('start-btn');

    let userInput = document.getElementById('user-input');
    const userOutput = document.getElementById('player-output');
    const submitBtn = document.getElementById('submit-btn');
    let userChoiceString = null;

    let computerInput = null;
    const computerOutput = document.getElementById('computer-output');

    // Variabler för poängen.
    let computerPoints = 0;
    let userPoints = 0;

    const displayComputerPoints = document.getElementById('computer-points');
    const displayUserPoints = document.getElementById('player-points');

    // Eventuella meddelanden som behöver visas.
    const gameMessage = document.getElementById('game-msg');

    let gameActive = false;

    // Variabler för namn input som sedan ska sparas i local storage och visas på sidan
    const nameInput = document.getElementById('name-input');
    const nameDisplay = document.getElementById('name-display');
    
    // För att local storage värdet faktiskt ska synas även om man laddar om sidan:
    nameDisplay.innerText = localStorage.getItem("name");


    // Funktion för att starta spelet. Start window försvinner och game window visas.
    function gameInit() {
        
        gameActive = true;

        if (gameActive === true) {
                
            startWindow.style.display = "none";
            gameWindow.style.display = "flex";
        }; 
    };

    // Gör start-knappen funktionell. När den trycks körs initGame().
    startBtn.addEventListener('click', function() {
        
        // Alla värden i game window resettas varje gång man börjar spelet.
        userPoints = 0;
        computerPoints = 0;
       // nameInput = "";

        displayComputerPoints.innerHTML = computerPoints;
        displayUserPoints.innerHTML = userPoints;

        computerOutput.innerHTML = '';
        userOutput.innerHTML = '';

        saveName();
        gameInit();

    });

    // Gör submit-knappen funktionell.
    submitBtn.addEventListener('click', function() {

        if (userInput.value === "" || userInput.value === null) {

            gameMessage.innerHTML = "Please input rock, paper or scissor.";

        } else {
            userChoice();
            userOutput.innerHTML = userChoice().toUpperCase();
            userChoiceString = userChoice().toString();
            /* Behövde göra kodraden ovan för annars visades inte något värde i
               konsollen när man ville få ut return värdet från userChoice funktionen
               och det skulle skapa problem när man gör if-satserna för att jämföra
               inputen mellan datorn och spelaren. */

            computerChoice();

            userInput.value = '';        // rensar input field
            gameMessage.innerHTML = '';  // rensar game message så den inte står kvar under resten av spelet
            
            compareChoices();
            winner();
        };

    });

    function saveName() {
        
        let handledInput = "";

        if((nameInput.value === "") || (nameInput.value === null)) {

            alert("You have not entered a name.");

        } else {

            handledInput = nameInput.value;
            handledInput = handledInput.trim();

        };

        localStorage.setItem('name', handledInput);
        nameDisplay.innerText = localStorage.getItem("name");
    };

    // Datorn väljer sten, sax, påse.
    function computerChoice() {
       
        let random = Math.floor(Math.random() * 3);
        
        if (random === 0) {
            computerInput = "rock";

        } else if (random === 1) {
            computerInput = "paper";

        } else if (random === 2) {
            computerInput = "scissor";

        }
    
        computerOutput.innerHTML = computerInput.toUpperCase(); // visar datorns val i HTML filen 
    };

    // Funktion för att hantera spelarens val genom dess input
    function userChoice() {

        let handledInput = userInput.value;
        handledInput = handledInput.trim();

        return handledInput.toLowerCase();
    };

    
    // Funktion som bestämmer reglerna för spelet
    function compareChoices() {

        if (computerInput === userChoiceString) {

            gameMessage.innerHTML = "Draw! Try again.";

        } else if ((computerInput === "rock" && userChoiceString === "paper") || 
                   (computerInput === "paper" && userChoiceString === "scissor") ||
                   (computerInput === "scissor" && userChoiceString === "rock")) 
            {
            
            userPoints++;
            gameMessage.innerHTML = "Player wins a point.";

        } else if ((computerInput === "rock" && userChoiceString === "scissor") || 
                   (computerInput === "paper" && userChoiceString === "rock") ||
                   (computerInput === "scissor" && userChoiceString === "paper")) {

            computerPoints++;
            gameMessage.innerHTML = "Computer wins a point.";

        }  else {

            gameMessage.innerHTML = "Something went wrong. Please check your input and try again.";
        };

        displayComputerPoints.innerHTML = computerPoints;
        displayUserPoints.innerHTML = userPoints;
    };

    function winner() {

        if (computerPoints === 3) {

            gameMessage.innerHTML = "Game over - Computer wins! Thank you for playing, the game will restart in a moment.";
            gameActive = false;

            setTimeout(() => {  
                startWindow.style.display = "flex";
                gameWindow.style.display = "none";
            }, 5000);

        } else if (userPoints === 3) {

            gameMessage.innerHTML = "Game over - Player wins! Thank you for playing, the game will restart in a moment.";
            gameActive = false;

            setTimeout(() => {  
                startWindow.style.display = "flex";
                gameWindow.style.display = "none";
            }, 5000);
        }

    };

});