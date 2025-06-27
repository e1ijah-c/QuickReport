const suggestions = [
                      "Here comes the suggestions", 
                      "I like pizza", 
                      "I'm a good programmer"
                    ]

var pastInput = []

var textarea = document.getElementById('textarea')



textarea.addEventListener('keydown', (event) => {
  var key = event.key
  pastInput.push(key)
  
  if (pastInput.length > 10) {
    pastInput.pop()
  } 

  console.log(pastInput)
})