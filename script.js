const textarea = document.getElementById('myInput')
var input = ''
var menuOpen = false
var canSpReturn = true
const part1Options = ["OCC (BEDOK AS),", "OCC (R1S AS),", "OCC (SEL AS),", "OCC (SCA AS),", "OCC (MPA AS),",
    "TAB (TAB STATIC AS),", "SBAB (SBAB DD),", "ADOC (ADOC MOBILE AS),", "PLAB (PLAB PE(N)),", "PLAB (PLAB PE(S)),",
    "SPF (POLARIS),", "not req", "not reg", "TBC",]
const part2Options = ["activated", "on-site, patrolling", "on-site, located operator, tallying UAS ID",
    "located operator, tallying UAS ID", "on-site, linking up with", "confirm tallied UAS ID, taking down operator details",
    "confirm UAS ID not tallied, will continue to patrol", "stood down", "stood down with nil findings, nil sightings",
    "stood down after taking down operator details", "CAB [W] MDT", "CAB [E] MDT", "CAB [M] MDT", "PLAB MDT", "SBAB MDT",
    "TAB MDT", "CAG MDT (T1)", "CAG MDT (T2)", "AETOS", "AETOS (IW1)", "AETOS (IW2)", "AETOS (IW3)", "AETOS (IW4)",
    "AETOS (CT1)", "AETOS (CT2)", "AETOS (CT3)", "AETOS (CT4)", "Sentosa Island Ranger", "SPF", "PCG", "MPA"]
const part3Options = ["OCC OC informed", "RC informed by TBCP", "TBCP informed RC", "RC informed by PBCP", "ADOC informed RC",
    "RC informed by ADOC", "PBCP informed RC", "RC informed by SBCP", "SBCP informed RC", "OCC OC informed by POCC", "POCC informed OCC OC",
    "203 informed", "CBCP informed", "PBCP informed", "SBCP informed", "TBCP informed", "AFCIC informed", "AOC informed",
    "CNB informed", "3x Line engaged", "POCC informed by OCC OC", "MSCC informed by OCC OC", "Sentosa Island Ranger informed by OCC OC"]
const part6Options = ["NIL", "TBC"]
const part7Options = ["Same as above", "TBC", "no nearby AAs", "no further det from OCC, no det from other A/S", "no further det from TAB, no det from OCC throughout, no det from other A/S",
    "no further det from ADOC, no det from OCC throughout, no det from other A/S", "no further det from PLAB, no det from OCC throughout, no det from other A/S",
    "no further det from SBAB, no det from OCC throughout, no det from other A/S", "no further det from SPF, no det from OCC throughout, no det from other A/S",
    "since UAS is reg OCC OC will handover operator details to CAAS enforcement, no further det from OCC, no det from other AS",
    "OCC OC informed RC UAS is reg", "OCC OC informed RC UAS is not reg", "UAS last det dropped off @", "UAS appeared within STW @",
    "UAS crossed into STW @", "UAS crossed into MTW @", "NIL"] 
const commands = ["/b1", "/b2", "/b3", "/u1", "/u2", "/u3"]

const report = `1. Reported by (Source) / Location / Telemetry (if any) / Registration
> 

2. Ground Enforcement:
> 

3. Info Exchange:
> 

4. L&R Restrictions:
> 

5. Disruptor:
> 

6. Past Detection/s:
> 

7. Others:
> Indicative Pilot Location:
>  `


function checkLineEmpty(line) {
  trimmedLine = line.trim()
  console.log(trimmedLine)

  if (trimmedLine.length === 1) {
    return true
  } else {
    return false
  }
}

function getReportSection() {
  var curPos = textarea.selectionStart
  pretext = textarea.value.substring(0, curPos)
  var lines = pretext.split('\n')

  for (let i = lines.length - 1; i >= 0; i--) {
    firstChar = lines[i][0]
    if (isNumeric(firstChar)) {
      return firstChar
    }
  }
}

function partOfReport() {
  var curPos = textarea.selectionStart
  pretext = textarea.value.substring(0, curPos)
  var lines = pretext.split('\n')

  // check if first character in current line is ">" character 
  if (lines[lines.length - 1][0] === ">") {
    return true;
  } else {
    return false;
  }
}


function LastDetTime() {
  var curPos = textarea.selectionStart
  var pretext = textarea.value.substring(0, curPos)
  //var posttext = textarea.value.substring(curPos)
  var lines = pretext.split('\n')
  console.log(lines)
  var part1Index
  var lastDetLine

  try {
    for (let i = lines.length - 1; i >= 0; i--) {
      // find where part 1 of the report is
      if (lines[i][0] === '1') {
        part1Index = i
        console.log("found part 1 of report: " + part1Index)
        //iterate until the very latest detection and save the last det line
        for (let a = part1Index; a < lines.length; a++) {
          lineFirstChar = lines[a+1][0]
          console.log("first char in line: " + lineFirstChar)
          if (lineFirstChar !== '>') {
            lastDetLine = lines[a]
            console.log(lastDetLine)
            break
          }
        }
        lastDetLineData = lastDetLine.split(",")
        console.log(lastDetLineData)
        timeOfDetString = lastDetLineData[0]
        durationString = lastDetLineData[lastDetLineData.length - 2]

        // clean and format both strings
        timeOfDetString = timeOfDetString.replace(/\s+/g, '')
        timeOfDetString = timeOfDetString.replace('>', '')

        durationString = durationString.replace(/\s+/g, '')
        durationString = durationString.toLowerCase()

        console.log('time of det: ' + timeOfDetString)
        console.log('duration of det: ' + durationString)

        durationChars = durationString.split("")
        var minutesIndex = durationString.indexOf("m"), secondsIndex 
        var mins, secs

        if (minutesIndex !== -1) {
          mins = parseInt(durationString.substring(0, minutesIndex))
          for (let n = minutesIndex; n < durationChars.length; n++) {
            if (isNumeric(durationChars[n]) === true) {
              let str = durationString.substring(n)
              secondsIndex = str.indexOf("s") 
              secs = parseInt(str.substring(0, secondsIndex))
              break
            }
            if (secs == null) {
              secs = 0
            }
          }
        } else {
          secondsIndex = durationString.indexOf("s") 
          mins = 0
          secs = parseInt(durationString.substring(0, secondsIndex))
        }
        
        console.log("mins: " + mins + " seconds: " + secs)

        detHours = Number(timeOfDetString.slice(0, 2))
        detMinutes = Number(timeOfDetString.slice(2))

        if (secs > 30) {
          mins += 1
        }

        detMinutes = Number(detMinutes) + mins
        
        if (detMinutes >= 60) {
          detHours += 1
          detMinutes -= 60
        }
        if (detMinutes < 10) {
          detMinutes = `0${detMinutes}`
        }
        if (detHours < 10) {
          detHours = `0${detHours}`
        }

        detDroppedOffTime = `${detHours}${detMinutes}` + "H"
        console.log(detDroppedOffTime)

        return detDroppedOffTime

      }
    } 
  }
  catch (error) {
    return "";
  }
}

function isNumeric(str) {
  return !isNaN(parseFloat(str)) && isFinite(str);
}

function specialReturn() {
  var curPos = textarea.selectionStart
  var pretext = textarea.value.substring(0, curPos)
  var posttext = textarea.value.substring(curPos)

  var lines = pretext.split('\n')
  var lineAbove = lines[lines.length - 2]
  var firstChar = lineAbove[0]

  if (menuOpen) {
    return
  }

  if (firstChar !== '>') {
    return
  }

  if (checkLineEmpty(lines[lines.length - 2])) {
    pretext = textarea.value.substring(0, curPos - lines[lines.length -2].length - 1)

    textarea.value = pretext + posttext
    textarea.selectionStart = pretext.length 
    textarea.selectionEnd = pretext.length 

  } else {
    //add selected item and rejoin whole input together again
    textarea.value = pretext + ">  " + posttext

    // Set caret position to be one space ahead of the autofilled word
    textarea.selectionStart = pretext.length + 2
    textarea.selectionEnd = pretext.length + 2
  }  
}

textarea.addEventListener('keyup', (event) => { 
  var key = event.key

  if (key === "Enter" && canSpReturn) {
    specialReturn()
  }
})

textarea.addEventListener('keydown', (event) => {
  var key = event.key

  switch ( key ) {
    case "Backspace":
      input = input.slice(0, -1);

      if (event.metaKey || event.altKey) {
        input = ""
      }
      break
    case " ":
      if (menuOpen === false) {
        input = ""
        break
      } else {
        combinedInput = input + key;
        input = combinedInput;
        break
      }
    case "Enter":
    case "ArrowUp":
    case "ArrowDown":
    case "ArrowLeft":
    case "ArrowRight":
      
      if (menuOpen === false) {
        input = ""
        
        break
      } else {
        break
      }
      
    default:
      if (key.length === 1) {
        combinedInput = input + key;
        input = combinedInput;
      }
  }
  console.log("full input: ", input)
})

textarea.addEventListener('mousedown', (event) =>  {
  if (event.button === 0) {
    input = ""
    console.log("full input: ", input)
  }
})

$( function() {
  var availableTags = [];
  $( "#myInput" )
  .on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
  })
  .autocomplete({
  autoFocus: true, 
  position: { of: "#cursorAnchor" }, 
  source: function( request, response ) {
    // only starts showing suggestions if typing on a ">" line AND when 1 or more characters are typed
    if (input.length < 1) {
      // close autofill menu if open
      $( "#myInput" ).autocomplete( "close" );
      return
    }
    
    if (!partOfReport()) {
      availableTags = commands
       // matcher function to suggest matches only with the word contained
        var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( input ), "i" );
            response( $.grep( availableTags, function( item ){
                return matcher.test( item );
        }) );
      return
    }

    // show specific options based on what part of the report is being edited
    num = getReportSection()

    switch ( num ) {
      case "1":
        availableTags = part1Options
        break
      case "2":
        availableTags = part2Options
        break
      case "3":
        availableTags = part3Options
        break
      case "6":
        availableTags = part6Options
        break
      case "7":
        availableTags = part7Options
        break
    }

    // matcher function to suggest matches only with the word contained
    var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( input ), "i" );
        response( $.grep( availableTags, function( item ){
            return matcher.test( item );
    }) );
  },
  focus: function() {
    // prevent value inserted on focus
    return false;
  },
  open: function() {
    menuOpen = true;
    console.log("menu is open")
  },
  close: function() {
    menuOpen = false;
    console.log("menu is closed")
  },
  select: function( event, ui ) {
    var ans = ui.item.value
    var curPos = this.selectionStart
    var pretext = this.value.substring(0, curPos - input.length)
    var posttext = this.value.substring(curPos)
    
    
    if (ans === "UAS last det dropped off @") {
      //add selected item and rejoin whole input together again
      ans = ui.item.value + " " + LastDetTime()
    } 

    switch ( ans ) {
      case "/b1":
        ans = "BAZ 1A - Green\n\n" + report + '\n\n'
        break
      case "/b2":
        ans = "BAZ 2A - Green\n\n" + report + '\n\n'
        break
      case "/b3":
        ans = "BAZ 3A - Green\n\n" + report + '\n\n'
        break
      case "/u1":
        ans = "UAS 1A - Green\n\n" + report + '\n\n'
        break
      case "/u2":
        ans = "UAS 2A - Green\n\n" + report + '\n\n'
        break
      case "/u3":
        ans = "UAS 3A - Green\n\n" + report + '\n\n'
        break
    }

    //add selected item and rejoin whole input together again
    this.value = pretext + ans + " " + posttext
    input = ""
    console.log("full input: ", input)
    
    // Set caret position to be one space ahead of the autofilled word
    this.selectionStart = pretext.length + ans.length + 1
    this.selectionEnd = pretext.length + ans.length + 1

    // Prevent special return function from running when not intended
    canSpReturn = false
    setTimeout(function () {canSpReturn = true}, 1000)

    return false;
    }
  });
}); 

/* jshint browser: true */

(function () {

// We'll copy the properties below into the mirror div.
// Note that some browsers, such as Firefox, do not concatenate properties
// into their shorthand (e.g. padding-top, padding-bottom etc. -> padding),
// so we have to list every single property explicitly.
var properties = [
  'direction',  // RTL support
  'boxSizing',
  'width',  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
  'height',
  'overflowX',
  'overflowY',  // copy the scrollbar for IE

  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderStyle',

  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',

  // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'fontSizeAdjust',
  'lineHeight',
  'fontFamily',

  'textAlign',
  'textTransform',
  'textIndent',
  'textDecoration',  // might not make a difference, but better be safe

  'letterSpacing',
  'wordSpacing',

  'tabSize',
  'MozTabSize'

];

var isBrowser = (typeof window !== 'undefined');
var isFirefox = (isBrowser && window.mozInnerScreenX != null);

function getCaretCoordinates(element, position, options) {
  if (!isBrowser) {
    throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
  }

  var debug = options && options.debug || false;
  if (debug) {
    var el = document.querySelector('#input-textarea-caret-position-mirror-div');
    if (el) el.parentNode.removeChild(el);
  }

  // The mirror div will replicate the textarea's style
  var div = document.createElement('div');
  div.id = 'input-textarea-caret-position-mirror-div';
  document.body.appendChild(div);

  var style = div.style;
  var computed = window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle;  // currentStyle for IE < 9
  var isInput = element.nodeName === 'INPUT';

  // Default textarea styles
  style.whiteSpace = 'pre-wrap';
  if (!isInput)
    style.wordWrap = 'break-word';  // only for textarea-s

  // Position off-screen
  style.position = 'absolute';  // required to return coordinates properly
  if (!debug)
    style.visibility = 'hidden';  // not 'display: none' because we want rendering

  // Transfer the element's properties to the div
  properties.forEach(function (prop) {
    if (isInput && prop === 'lineHeight') {
      // Special case for <input>s because text is rendered centered and line height may be != height
      if (computed.boxSizing === "border-box") {
        var height = parseInt(computed.height);
        var outerHeight =
          parseInt(computed.paddingTop) +
          parseInt(computed.paddingBottom) +
          parseInt(computed.borderTopWidth) +
          parseInt(computed.borderBottomWidth);
        var targetHeight = outerHeight + parseInt(computed.lineHeight);
        if (height > targetHeight) {
          style.lineHeight = height - outerHeight + "px";
        } else if (height === targetHeight) {
          style.lineHeight = computed.lineHeight;
        } else {
          style.lineHeight = 0;
        }
      } else {
        style.lineHeight = computed.height;
      }
    } else {
      style[prop] = computed[prop];
    }
  });

  if (isFirefox) {
    // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
    if (element.scrollHeight > parseInt(computed.height))
      style.overflowY = 'scroll';
  } else {
    style.overflow = 'hidden';  // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
  }

  div.textContent = element.value.substring(0, position);
  // The second special handling for input type="text" vs textarea:
  // spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
  if (isInput)
    div.textContent = div.textContent.replace(/\s/g, '\u00a0');

  var span = document.createElement('span');
  // Wrapping must be replicated *exactly*, including when a long word gets
  // onto the next line, with whitespace at the end of the line before (#7).
  // The  *only* reliable way to do that is to copy the *entire* rest of the
  // textarea's content into the <span> created at the caret position.
  // For inputs, just '.' would be enough, but no need to bother.
  span.textContent = element.value.substring(position) || '.';  // || because a completely empty faux span doesn't render at all
  div.appendChild(span);

  var coordinates = {
    top: span.offsetTop + parseInt(computed['borderTopWidth']),
    left: span.offsetLeft + parseInt(computed['borderLeftWidth']),
    height: parseInt(computed['lineHeight'])
  };

  if (debug) {
    span.style.backgroundColor = '#aaa';
  } else {
    document.body.removeChild(div);
  }

  return coordinates;
}

if (typeof module != 'undefined' && typeof module.exports != 'undefined') {
  module.exports = getCaretCoordinates;
} else if(isBrowser) {
  window.getCaretCoordinates = getCaretCoordinates;
}

}());




