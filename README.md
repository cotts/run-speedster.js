# run-speedster.js # 

## A simple way to animate texts with a speedster animated character

## Only Javascript
* No Dependency
* Just install and deploy

[Demo Here](https://cotts.github.com/run-speedster.js)

<p align="center">
  <img src="https://rawgit.com/cotts/run-speedster.js/master/img/runspeedster.gif" width="600"/>
</p>

### Instructions

1- Clone repository

`git clone https://github.com/cotts/run-speedster.js.git`

2- Import Code to your HTML : 
Ex: 
` <script src="../dist/run-speedster.min.js"></script>`

3- Create Element

```javascript
RunSpeedster.init(
  // required - element that the character will be placed and run inside
  '.race-path', //you can change the class for any other one
  //required - the text or DOM element that will become after the run
  '.run-text', //you can change the class for any other one
    { 
      //Choosing your character: 4 options available 
      'runner': 'standard', //default
      //Size of the runner
      'howBig' : 50 //default (Size in px: width and heigth)
      //the speed of the element (60fps)
      'speed': 60, //default
      //if it will be disappear in the end of the run or not
      'disappear': true //default : false
      }
)
``` 
## The chacacters available until now.

> Standard - use 'standard'  
<img src="https://rawgit.com/cotts/run-speedster.js/master/img/standard.svg"  width="50px" heigth="50px"/>

> Modern (The CW The Flash) - use 'modern'   
<img src="https://rawgit.com/cotts/run-speedster.js/master/img/modern.svg"  width="50px" heigth="50px"/>

> Kid Flash - use 'kidflash'   
<img src="https://rawgit.com/cotts/run-speedster.js/master/img/kidflash.svg"  width="50px" heigth="50px"/>

> Zoom - use 'zoom'  
<img src="https://rawgit.com/cotts/run-speedster.js/master/img/zoom.svg"  width="50px" heigth="50px"/>



### If you have any trouble or would like to colaborate, join me!

#### There are some bugs and improvements that will be fixed as soon as possible:
* Increase the performance of the module
* JS Functional Pattern
* Correct some metrics of the Math inside the code.
