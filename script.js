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
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
  })
  .autocomplete({
  autoFocus: true, 
  //osition: { of: "#redmarker" }, 
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
    var curPos = this.selectionStart
    var pretext = this.value.substring(0, curPos - input.length)
    var posttext = this.value.substring(curPos)
    //add selected item and rejoin whole input together again
    this.value = pretext + ui.item.value + " " + posttext
    input = ""
    console.log("full input: ", input)
    return false;
    }
  });
}); 


var getCaretCoordinates = require('textarea-caret');

document.querySelector('textarea').addEventListener('input', function () {
  var caret = getCaretCoordinates(this, this.selectionEnd);
  console.log('(top, left, height) = (%s, %s, %s)', caret.top, caret.left, caret.height);
})
