const suggestions = [
                      "Here comes the suggestions", 
                      "I like pizza", 
                      "I'm a good programmer"
                    ]

var pastInput = []

var textarea = document.getElementById('textarea')



textarea.addEventListener('keydown', (event) => {
  var key = event.key
  
  if (pastInput.length > 10) {
    pastInput.shift()
    pastInput.push(key)
  } else {
    pastInput.push(key)
  }
  console.log(pastInput.length)
  console.log(pastInput)
})

/*change logic to instead concate a string => makes it easier to check for matches */