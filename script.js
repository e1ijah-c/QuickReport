const suggestions = [
                      "Here comes the suggestions", 
                      "I like pizza", 
                      "I'm a good programmer"
                    ]

var textarea = document.getElementById('textarea')



textarea.addEventListener('input', (e) => {
  var textInput = textarea.value.toLowerCase();

  console.log(textInput)
})