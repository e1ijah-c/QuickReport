const suggestions = [
                      "Here comes the suggestions", 
                      "I like pizza", 
                      "I'm a good programmer"
                    ]


var textarea = document.getElementById('myInput')
var anchorInput = document.getElementById('cursorAnchor')
var input = ''

textarea.addEventListener('keydown', (event) => {
  var key = event.key
  
  /* test to check only if a character key was pressed */
  if (key.length > 1) {
    if (key === 'Backspace') {
      input = input.slice(0, -1);
      console.log("backspace pressed")
    }
    return;
  }

  if (key === ' ') {
    input = ''; 
  } else {
    combinedInput = input + key;
    input = combinedInput;
  }

  UpdateAnchorValue(input)
  console.log("full input: ", input)
  console.log("anchor text box value: ", anchorInput.value)
})

function UpdateAnchorValue(newInput) {
  anchorInput.value = newInput;
}

/*
- change logic to instead concate a string => makes it easier to check for matches 
- make it so that the string clears everytime space is entered to signify new word
- change max no. of characters
- make the current div a text field and make its value = to the value of the current string
- use that as the input for the autocomplete but change its behaviour to update the textarea instead using the on select event?
*/