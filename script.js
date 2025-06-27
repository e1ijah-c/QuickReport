const suggestions = [
                      "Here comes the suggestions", 
                      "I like pizza", 
                      "I'm a good programmer"
                    ]

var textarea = document.getElementById('textarea')

textarea.addEventListener('keyup', (e) => {
  var textInput = textarea.value.toLowerCase();
  var result = suggestions.filter(el => el.startsWith(textInput))
  console.log(result)
})