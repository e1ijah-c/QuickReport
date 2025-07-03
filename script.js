const textarea = document.getElementById('myInput')
const anchor = document.getElementById('cursorAnchor')
var input = ''
var menuOpen = false

textarea.addEventListener('keydown', (event) => {
  var key = event.key

  switch ( key ) {
    case "Backspace":
      input = input.slice(0, -1);

      if (event.metaKey) {
        input = ""
      }
      break
    case " ":
      input = ""
      break
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
  var availableTags = [
    "no further det from OCC, no det from other A/S",
    "no further det from TAB, no det from OCC throughout, no det from other A/S",
    "no nearby AAs",
    "UAS last det dropped off @",
    "UAS appeared within STW @",
    "UAS crossed into STW @",
    "UAS crossed into MTW @",
    "not req",
    "Same as above",
    "OCC (BEDOK AS)",
    "OCC (R1S AS)",
    "OCC (SEL AS)",
    "OCC (SCA AS)",
    "OCC (MPA AS)",
    "TAB (TAB STATIC AS)",
    "SBAB (SBAB DD)",
    "ADOC (ADOC MOBILE AS)",
    "PLAB (PLAB PE(N))",
    "PLAB (PLAB PE(S))",
    "SPF (POLARIS)",
    "on-site, patrolling",
    "on-site, located operator, tallying UAS ID",
    "confirm tallied UAS ID, taking down operator details",
    "stood down",
    "stood down with nil findings, nil sightings",
    "stood down after taking down operator details",
    "CAB [W] MDT",
    "CAB [E] MDT",
    "CAB [M] MDT",
    "PLAB MDT",
    "SBAB MDT",
    "TAB MDT",
    "CAG MDT (T1)",
    "CAG MDT (T2)",
    "AETOS (CT1)",
    "AETOS (CT2)",
    "AETOS (CT3)",
    "AETOS (CT4)",
    "AETOS (IW1)",
    "AETOS (IW2)",
    "AETOS (IW3)",
    "AETOS (IW4)",
    "AETOS (IW5)",
    "AETOS (IW6)",
    "AETOS",
    "SPF",
    "203 informed",
    "CBCP informed",
    "PBCP informed",
    "SBCP informed",
    "TBCP informed",
    "AFCIC informed",
    "AOC informed",
    "OCC OC informed",
    "3x Line engaged",
    "POCC informed by OCC OC",
    "MSCC informed by OCC OC",
    "Sentosa Island Ranger informed by OCC OC",
    "Sentosa Island Ranger"
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
  position: { of: "#cursorAnchor" }, 
  source: function( request, response ) {
  // only starts showing suggestions when 2 or more characters are typed
    if (input.length >= 2){
      // matcher function to suggest matches only with the word contained
      var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( input ), "i" );
          response( $.grep( availableTags, function( item ){
              return matcher.test( item );
      }) );
    } else {
      $( "#myInput" ).autocomplete( "close" );
    }
    
    
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




