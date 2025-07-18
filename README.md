# ✈️  Overview

### _[QuickReport](https://e1ijah-c.github.io/QuickReport/)_ is a _GitHub Pages_ site with numerous features designed to streamline the reporting process for UAS operators committing offences. 

This project was made with the intention of decreasing communication downtime between OCC (Changi Airport) and the RSAF. With the fast-paced nature of UAS occurences, it is imperative that mutual situation awareness is achieved between these agencies. 

Thus, this site aims to address several factors which reduce the speed of which these informative reports can be produced through the features listed below.

### Features List
1. _**Report-specific autofill suggestions**_ — for commonly used terms & phrases.
2. _**Automatic UAS last detection time calculation**_
3. _**Command prompts**_ — to instantly generate fresh report templates.
4. _**Data persistance**_ — the site will save input so that notes aren't lost when reloading.
5. _**Special return**_ — automatically produces a **">"** character when making a new line in the report.

# ⌨️ Usage 

### Autofill
> ###### Note: Which part of the report is being edited matters — suggestions will be specific to each section to reduce the number of options and menu loading time.

<kbd>Tab</kbd>  selects the top option.

<kbd>Enter</kbd>  selects the currently focused option.

<kbd>↑</kbd><kbd>↓</kbd> to navigate the autofill menu.

<kbd>esc</kbd> closes the autofill menu.


### UAS Last Detection Time Calculation
> ###### Note: Requires & assumes section 1 of the report is fully and properly filled out in order to function properly. 

Selecting the "```UAS last det dropped off @ ```" prompt will substitute the time itself, based on section 1 of the report. 


### Command Prompts

``` /b1 ```, ``` /b2 ``` & ``` /b3 ``` creates an empty report for _BAZ 1A, 2A & 3A_ respectively.

``` /u1 ```, ``` /u2 ``` & ``` /u3 ``` creates an empty report for _UAS 1A, 2A & 3A_ respectively.

More commands may be added in future.


### Special Return

Understand that all data part of the report will begin with an "```>```" character. 

Case 1 — Filled line:

Pressing <kbd>Enter</kbd> on the following line (caret is at the end): 

```
> Some text here 
```

Output:

```
> Some text here 
>
```


# ⛏️ Useful Resources
> Resources that were extremely helpful for this project's development.

- [ jQuery Autocomplete Widget ](https://automaticaddison.com/howhttps://jqueryui.com/autocomplete/#multiple) which was used as the backbone and foundation for the autofill feature. 
- [ MDN Web Docs ](https://developer.mozilla.org/en-US/docs/Web/JavaScript) for Javascript is what I found to be among the best documentation websites — strongly written and comprehensive. 






