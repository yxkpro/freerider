var Hangman = function(elem, mode) {
    var alphabet = "abcdefghijklmnopqrstuvwxyz",
        request,
        word = "",
        wordid = "",
        word_list_track = [
            { word: "dry grove sanctuary", wordid: "933124" },
            { word: "magnum opus", wordid: "191253" },
    { word: "regret", wordid: "828584" },
    { word: "ostoria", wordid: "755617" },
    { word: "generation", wordid: "57072" },
    { word: "project wilderness", wordid: "866629" },
    { word: "black magic", wordid: "127165" },
    { word: "fish bowl", wordid: "275122" },
    { word: "rain kids", wordid: "927503" },
    { word: "mammoth revival", wordid: "657481" },
    { word: "sahara", wordid: "285906" },
    { word: "crested butte", wordid: "737010" },
    { word: "onyx", wordid: "680227" },
    { word: "marshlands retreat", wordid: "659234" },
    { word: "tropisms", wordid: "735496" },
    { word: "circle of life", wordid: "653562" },
    { word: "playground", wordid: "297254" },
    { word: "gravitic flux", wordid: "681633" },
    { word: "sleep paralysis", wordid: "726656" },
    { word: "Studio apt", wordid: "456878" },
    { word: "our downfall", wordid: "878989" },
    { word: "terrified", wordid: "486253" },
    { word: "adventure", wordid: "223859" },
    { word: "the ellie badge", wordid: "646153" },
    { word: "winterfreuden", wordid: "608078" },
    { word: "decay", wordid: "680828" },
    { word: "skeleton sea", wordid: "682672" },
    { word: "taeda", wordid: "512321" },
    { word: "wirrwarr", wordid: "768079" },
    { word: "born to explore", wordid: "788118" },
            // More tracks...
        ],
        word_list_player = [
            { word: "ness", wordid: "ness" },
            { word: "volund", wordid: "volund" },
            { word: "eryp", wordid: "eryp" },
    { word: "nitrogeneric", wordid: "nitrogeneric" },
    { word: "talltexan", wordid: "talltexan" },
    { word: "wheeliemaker", wordid: "wheeliemaker" },
    { word: "seasnails", wordid: "seasnails" },
    { word: "albatross", wordid: "albatross" },
    { word: "bowloffire", wordid: "bowloffire" },
    { word: "silentfinger", wordid: "silentfinger" },
    { word: "tremulant", wordid: "tremulant" },
    { word: "spruce", wordid: "spruce" },
    { word: "cityshep", wordid: "cityshep" },
    { word: "backtwice", wordid: "backtwice" },
    { word: "maple", wordid: "maple" },
    { word: "wyattstonhouse", wordid: "wyattstonhouse" },
    { word: "drndemi", wordid: "drndemi" },
    { word: "alexander", wordid: "alexander" },
    { word: "xwinx", wordid: "xwinx" },
    { word: "wave", wordid: "wave" },
    { word: "noob", wordid: "noob" },
    { word: "teamphantom", wordid: "teamphantom" },
    { word: "figured", wordid: "figured" },
            // More players...
        ],
        word_list = mode === 'track' ? word_list_track : word_list_player,
        letters_guessed = [],
        displayed_word,
        lives_left = 7,
        game_complete = false;
        
    // create DOM elements
    var top_display = quickCreateElement("div", "top-display"),     
        DOM_displayed_word = quickCreateElement("div", "displayed-word"),
        DOM_lives_left = quickCreateElement("div", "lives-left"),
        DOM_game_message = quickCreateElement("div", "message"),
        buttons_section = quickCreateElement("div", "buttons-section"),
        // DOM_letters_guessed,
        letter_buttons = [];    
        
    // create buttons
    for (var i=0; i<26; i++) {
        letter_buttons.push(quickCreateElement("button", "letter-button", alphabet[i]));
    }
    
    // organise DOM elements        
    top_display.appendChild(DOM_displayed_word);
    top_display.appendChild(DOM_lives_left);
    top_display.appendChild(DOM_game_message);
    
    for (var i = 0; i < 26; i++) {
        buttons_section.appendChild(letter_buttons[i]);
    }
    
    
    // HELPER FUNCTIONS
    
    function quickCreateElement(type, cls, id) {
        var ret = document.createElement(type);
        if (cls) { ret.classList.add(cls); }
        if (id) { ret.id = id; }
        return ret
    }
        
    function contains(arr, el) {
    // function to check if arr contains el
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == el) { return true }
        }
        return false
    };


    // PROCESS FUNCTIONS
    
    function reset () {
        while(elem.lastChild) {
            elem.removeChild(elem.firstChild);
        }
    };
    
    function getWord() {
        request = new XMLHttpRequest;
        request.open('GET', 'https://crossorigin.me/http://randomword.setgetgo.com/get.php');
        request.onload = function() {
            if (request.status == 200){     
                word = request.response.toLowerCase();
                loadInitialDOM();
                render();   
            }
            // ...else
        };
        request.onerror = function() {
            console.log('connection error');
        };
        request.send();     
    };
    
    // to use on localhost etc., where API is blocked
    function getWordNoAPI() {
        var selectedWordObject = word_list[Math.floor(Math.random() * word_list.length)];
        word = selectedWordObject.word;
        wordid = selectedWordObject.wordid;
        loadInitialDOM();
        render();
    }
    
    function loadInitialDOM() {    
        elem.appendChild(top_display);
        elem.appendChild(buttons_section);
    };

    function render() {
        renderDisplayedWord();
        DOM_lives_left.innerHTML = "attempts left: " + lives_left;
        evaluateResult();
        if (game_complete) {
            DOM_game_message.innerHTML = game_complete;
        }
        renderButtons(game_complete);
    };

    function renderDisplayedWord() {
        displayed_word = "";
        for (var i = 0; i < word.length; i++) {
            if (word[i] === " ") {
                displayed_word += "&nbsp;&nbsp;";  // Use non-breaking spaces in HTML to represent spaces in the word
            } else if (contains(letters_guessed, word[i])) {
                displayed_word += word[i];
            } else {
                displayed_word += "_";
            }
            displayed_word += " "; // Add space between letters/underscores
        }
        DOM_displayed_word.innerHTML = displayed_word.trim();
    }
    
    function evaluateResult() {
        var link = mode === 'track' ? 'https://freeriderhd.com/t/' : 'https://freeriderhd.com/u/';
        if (!contains(displayed_word, "_")) {
            game_complete = "good job! you correctly guessed the " + mode + " " + word +
                " (<a target='_blank' href='" + link + wordid + "'>play " + mode + "</a>)";
        }
        if (lives_left <= 0) {
            game_complete = "sorry, you lose! the correct " + mode + " was " + word +
                " (<a target='_blank' href='" + link + wordid + "'>play " + mode + "</a>)";
        }
    }

    function renderButtons(game_over) {
        for (var i = 0; i < 26; i++) {
            b = letter_buttons[i];
            b.innerHTML = "";
            b.removeEventListener("click", letter_select);
            b.innerHTML = alphabet[i];
            if (!game_over && !contains(letters_guessed, alphabet[i])) {
                b.addEventListener("click", letter_select);
            }
            else {
                b.classList.add("deactivated");
            }
        }
    };
  
    function updateGameSettingsHangman() {
        if (typeof GameSettings !== 'undefined' && typeof GameManager !== 'undefined') {
            var hangmanValue = lives_left; // Constructing the string based on lives_left
            GameSettings.hangman = hangmanValue;
            GameManager.command("bikeSettings", false); // Update the game settings (you might need to adjust this command)
        }
    }
    
    // Call updateGameSettingsHangman() wherever lives_left is updated
    function letter_select() {
        var letter = event.target.id;
        letters_guessed.push(letter);
        if (!contains(word, letter)) {
            lives_left -= 1;
            updateGameSettingsHangman(); // Update GameSettings.hangman when lives_left changes
        }
        render();
    };

    // START GAME
    // getWord() calls loadInitialDOM() and render() if request is successful, because of
    // asynchronicity. Should maybe be called initiateGame or something similar
    
    reset();
    //getWord();
    getWordNoAPI(); 

};

document.addEventListener('DOMContentLoaded', function() {
    var new_game_button_track = document.getElementById("new-game-button-track");
    var new_game_button_player = document.getElementById("new-game-button-player");
    var hangman_div = document.getElementById("hangman");
    
    new_game_button_track.addEventListener("click", function() {
        new Hangman(hangman_div, 'track');
    });

    new_game_button_player.addEventListener("click", function() {
        new Hangman(hangman_div, 'player');
    });
});



