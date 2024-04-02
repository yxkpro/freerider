var Hangman = function(elem, mode) {
    var alphabet = "abcdefghijklmnopqrstuvwxyz",
        request,
        word = "",
        wordid = "",
        word_list_track = [
            { word: "bay of biscay", wordid: "976883" },
{ word: "vita", wordid: "976001" },
{ word: "deferred", wordid: "973308" },
{ word: "the bark", wordid: "973164" },
{ word: "story of the artist", wordid: "971508" },
{ word: "super mid bros", wordid: "967735" },
{ word: "turkey stuffing with celery", wordid: "963089" },
{ word: "ambition", wordid: "959258" },
{ word: "wahoo", wordid: "958946" },
{ word: "temple run", wordid: "950596" },
{ word: "steady going numb", wordid: "950004" },
{ word: "when white flowers bloomed", wordid: "945217" },
{ word: "the ultracave", wordid: "938064" },
{ word: "questionable social constructs", wordid: "937269" },
{ word: "kelp me i'm drowining", wordid: "936672" },
{ word: "demi-goddest, demi-diety", wordid: "936317" },
{ word: "smithereens", wordid: "934980" },
{ word: "dead animal juice", wordid: "934728" },
{ word: "well", wordid: "934559" },
{ word: "the messenger", wordid: "934370" },
{ word: "dry grove sanctuary", wordid: "933124" },
{ word: "gallery of a rotting mind", wordid: "932953" },
{ word: "gurkinn's alakazam", wordid: "931539" },
{ word: "lucario v", wordid: "931408" },
{ word: "eclipse", wordid: "931233" },
{ word: "concorde", wordid: "931016" },
{ word: "the last tale of yggdrasil", wordid: "930500" },
{ word: "green version", wordid: "930490" },
{ word: "pokejoust", wordid: "930308" },
{ word: "neptune's keep", wordid: "929039" },
{ word: "rain kids", wordid: "927503" },
{ word: "desperation part iii", wordid: "923803" },
{ word: "nostalgia or time's atrophy", wordid: "917456" },
{ word: "the origins", wordid: "906266" },
{ word: "the singularity", wordid: "903079" },
{ word: "speleo symposium", wordid: "895180" },
{ word: "our downfall", wordid: "878989" },
{ word: "behemoth", wordid: "873989" },
{ word: "dreamt of ///// gonzalo", wordid: "870797" },
{ word: "vah medoh", wordid: "870655" },
{ word: "jettyside", wordid: "870601" },
{ word: "neptune's wave", wordid: "870048" },
{ word: "project wilderness", wordid: "866629" },
{ word: "archie's carnival", wordid: "861460" },
{ word: "revelation", wordid: "861315" },
{ word: "mundane", wordid: "853813" },
{ word: "primordial sketchlands", wordid: "835249" },
{ word: "terrarium", wordid: "834864" },
{ word: "battle carrier alexander-78v", wordid: "833365" },
{ word: "the scientist", wordid: "820399" },
{ word: "intrappolato", wordid: "798983" },
{ word: "wave memorial", wordid: "796239" },
{ word: "born to explore", wordid: "788118" },
{ word: "riffraff", wordid: "777048" },
{ word: "murmur", wordid: "772470" },
{ word: "realities edge", wordid: "768733" },
{ word: "all we need", wordid: "768709" },
{ word: "wirrwarr", wordid: "768079" },
{ word: "mashed peas", wordid: "757002" },
{ word: "ostoria", wordid: "755617" },
{ word: "tropisms", wordid: "735496" },
{ word: "hydra", wordid: "733058" },
{ word: "tundra", wordid: "732809" },
{ word: "this can't be real life", wordid: "727034" },
{ word: "computer", wordid: "726859" },
{ word: "sleep paralysis", wordid: "726656" },
{ word: "subterranean sky palace", wordid: "725622" },
{ word: "mammoth (revival)", wordid: "721816" },
{ word: "clandestine", wordid: "719425" },
{ word: "inca", wordid: "713551" },
{ word: "calypso", wordid: "713541" },
{ word: "utah", wordid: "709759" },
{ word: "beyond all bounds", wordid: "683320" },
{ word: "skeleton sea", wordid: "682672" },
{ word: "gravitic flux", wordid: "681633" },
{ word: "dwagonbweath", wordid: "681624" },
{ word: "decay", wordid: "680828" },
{ word: "onyx", wordid: "680227" },
{ word: "eldritch truth", wordid: "678499" },
{ word: "rapunzel", wordid: "676630" },
{ word: "rise of an empire", wordid: "675208" },
{ word: "mutation", wordid: "675001" },
{ word: "pigs on the wing", wordid: "674996" },
{ word: "maelstrom", wordid: "674948" },
{ word: "temple of time", wordid: "674933" },
{ word: "marshlands retreat", wordid: "659234" },
{ word: "mammoth", wordid: "657481" },
{ word: "kano mining company", wordid: "654028" },
{ word: "circle of life", wordid: "653562" },
{ word: "wintertide", wordid: "608323" },
{ word: "winterfreuden", wordid: "608078" },
{ word: "burial chambers", wordid: "591098" },
{ word: "planet free rider", wordid: "587737" },
{ word: "the battle of little bighorn", wordid: "575594" },
{ word: "costa concordia", wordid: "517429" },
{ word: "taeda", wordid: "512321" },
{ word: "shadow of the colossus", wordid: "470396" },
{ word: "fish bowl", wordid: "275122" },
{ word: "magnum opus", wordid: "191253" },
{ word: "the dreamt place", wordid: "155485"},
{ word: "black magic", wordid: "127165" }
            // More tracks...
        ],
        word_list_player = [
            { word: "i cat tall the dark 16", wordid: "loge_0"},
{ word: "wolfram", wordid: "wolfram" }
            // More players...
        ],
        word_list = mode === 'track' ? word_list_track : word_list_player,
        letters_guessed = [],
        displayed_word,
        lives_left = 7,
        game_complete = false;
        
    // create DOM elements
   // create DOM elements
   var top_display = quickCreateElement("div", "top-display"),
   DOM_displayed_word = quickCreateElement("div", "displayed-word"),
   DOM_lives_left = quickCreateElement("div", "lives-left"),
   DOM_game_message = quickCreateElement("div", "message"),
   buttons_section = quickCreateElement("div", "buttons-section"),
   letter_buttons = [];

// create buttons
for (var i = 0; i < 26; i++) {
   letter_buttons.push(quickCreateElement("button", "letter-button", alphabet[i]));
}

// Add keyboard event listener to handle letter input within the Hangman scope
document.addEventListener('keydown', function(event) {
   var key = event.key.toLowerCase(); // Normalize to lowercase to match the alphabet array
   if (alphabet.includes(key) && !contains(letters_guessed, key) && !game_complete) {
       letters_guessed.push(key);
       if (!word.includes(key)) {
           lives_left -= 1;
           updateGameSettingsHangman();
       }
       render();
   }
});
    
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
            var char = word[i];
            if (char === " ") {
                displayed_word += "&nbsp;&nbsp;";  // Add a single space for word separation
            } else if ("',-/016".includes(char)) {
                displayed_word += char;  // Directly append punctuation
            } else {
                if (contains(letters_guessed, char)) {
                    displayed_word += char;
                } else {
                    displayed_word += "_";
                }
            }
            displayed_word += " "; // Add space after each character or punctuation for readability
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
            var b = letter_buttons[i];
            b.innerHTML = alphabet[i];
            b.removeEventListener("click", letter_select);
            
            if (!game_over && !contains(letters_guessed, alphabet[i])) {
                b.addEventListener("click", function() {
                    letter_select(this.id);
                });
            } else {
                b.classList.add("deactivated");
            }
        }
    }
  
    function updateGameSettingsHangman() {
        if (typeof GameSettings !== 'undefined' && typeof GameManager !== 'undefined') {
            var hangmanValue = lives_left; // Constructing the string based on lives_left
            GameSettings.hangman = hangmanValue;
            GameManager.command("bikeSettings", false); // Update the game settings (you might need to adjust this command)
        }
    }
    
    // Call updateGameSettingsHangman() wherever lives_left is updated
    function letter_select(letter) {
        letters_guessed.push(letter);
        if (!contains(word, letter)) {
            lives_left -= 1;
            updateGameSettingsHangman(); // Update GameSettings.hangman when lives_left changes
        }
        render();
    }

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



