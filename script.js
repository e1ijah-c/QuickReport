const suggestions = [
                      "Here comes the suggestions", 
                      "I like pizza", 
                      "I'm a good programmer"
                    ]

var textarea = document.getElementById('textarea')

textarea.addEventListener('keyup', (e) => {
  var result = suggestions.filter(el => el.startsWith(textarea.value))
  console.log(result)
})