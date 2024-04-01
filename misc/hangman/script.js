var Hangman = function(elem) {

    var alphabet = "abcdefghijklmnopqrstuvwxyz",
        request,
        word = "smoothie",
        word_list = ["smoothie", "bypass", "awkward", "grovelled", "exception", "scythe", "preach", "winner", "wallow", "design", "despotic", "define", "freezes", "thumping"],
        word_length,
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
    function getWordNoAPI () {
        word = word_list[Math.floor(Math.random() * word_list.length)];
        loadInitialDOM();
        render();   
    };
    
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
            if (contains(letters_guessed, word[i])) {
                displayed_word += word[i];
            }
            else {
                displayed_word += "_";
            }
            displayed_word += (i == word.length) ? "" : " " ;
        }
        DOM_displayed_word.innerHTML = displayed_word;
    };
    
    function evaluateResult() {
        if (!contains(displayed_word, "_")) {
            game_complete = "good job! you correctly guessed the track " + word + "(<a target='_blank' href='https://www.google.co.uk/search?q=definition+" + word + "'>?</a>)";
        }
        if (lives_left <= 0) {
            game_complete = "sorry, you lose! the correct track was " + word + " (<a target='_blank' href='https://freeriderhd.com/t/" + word + "'>play track</a>)";
        }
    };

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
  
    function letter_select() {
        var letter = event.target.id;
        // if not already there..
        letters_guessed.push(letter);
        if (!contains(word, letter)) {
            lives_left -= 1;
            //GameSettings = hang1;
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

    var new_game_button = document.getElementById("new-game-button")
        hangman_div = document.getElementById("hangman");
        
    new_game_button.addEventListener("click", function() {
        new Hangman(hangman_div);
    });
});



