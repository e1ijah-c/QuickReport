const textarea = document.getElementById('myInput')
const anchor = document.getElementById('cursorAnchor')
var input = ''

textarea.addEventListener('keydown', (event) => {
  var key = event.key

  switch ( key ) {
    case "Backspace":
      input = input.slice(0, -1);
      console.log("full input: ", input)
      break
    case " ":
    case "Enter":
    case "ArrowUp":
    case "ArrowDown":
    case "ArrowLeft":
    case "ArrowRight":
      input = ""
      console.log("full input: ", input)
      break
    default:
      if (key.length === 1) {
        combinedInput = input + key;
        input = combinedInput;
        console.log("full input: ", input)
      }
  }
})

textarea.addEventListener('mousedown', (event) =>  {
  if (event.button === 0) {
    input = ""
    console.log("full input: ", input)
  }
})

$( function() {
  var availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme"
];
  $( "#myInput" )
  .on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( textarea ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
  })
  .autocomplete({
  autoFocus: true, 
  position: { of: "#cursorAnchor" }, 
  //source: [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ],
  source: function( request, response ) {
    // delegate back to autocomplete, but extract the last term
    if (input != "") {
      response( $.ui.autocomplete.filter(
      availableTags, input ));
    } else {
      $( ".selector" ).autocomplete( "close" );
    }
  },
  focus: function() {
    // prevent value inserted on focus
    return false;
  },
  select: function( event, ui ) {
    var curPos = textarea.selectionStart
    var pretext = textarea.value.slice(0, curPos - input.length)
    var posttext = textarea.value.slice(curPos)
    //add selected item and rejoin whole input together again
    textarea.value = pretext + ui.item.value + posttext
    return false;
    }
  });
}); 

function split( val ) {
  return val.split( /,\s*/ );
}

function extractLast( term ) {
  return split( term ).pop();
}

function UpdateTextValue(newInput) {
  textarea.value = newInput;
  console.log("full input: ", input)
  console.log("anchor text box value: ", autoinput.value)
}

/*
- change logic to instead concate a string => makes it easier to check for matches 
- make it so that the string clears everytime space is entered to signify new word
- change max no. of characters
- make the current div a text field and make its value = to the value of the current string
- use that as the input for the autocomplete but change its behaviour to update the textarea instead using the on select event?
*/