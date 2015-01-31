# multiple-bundles-example

A basic example of using browserify-rails with [multiple bundles](https://github.com/substack/node-browserify#multiple-bundles). Start the server and navigate to `http://localhost:3000` and observe this output on the page:

```
Robbie says BEEP!

Robbie says BOOP!

AcmeBot says SKLARG!
```

Then load the individual bundles:

[/assets/common.js](http://localhost:3000/assets/common.js) which will contain at the end something similar to this:

```javascript
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var robot = require('./robot');

robot.setName('Robbie');

},{"./robot":"9WgEjc"}],"./robot":[function(require,module,exports){
module.exports=require('9WgEjc');
},{}],"9WgEjc":[function(require,module,exports){
module.exports = {
  getName: function() {
    return this.name || 'AcmeBot';
  },

  setName: function(n) {
    this.name = n;
  },

  talk: function (s) {
    return this.getName() + ' says ' + s.toUpperCase() + '!'
  }
}

},{}]},{},[1])
```

Next take a look at:

[/assets/beep.js](http://localhost:3000/assets/beep.js)

```javascript
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var robot = require('./robot');

$('body').append('<p>' + robot.talk('beep') + '</p>');

},{"./robot":"9WgEjc"}]},{},[1])
```

Next take a look at:

[/assets/boop.js](http://localhost:3000/assets/boop.js)

```javascript
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var robot = require('./robot');

$('body').append('<p>' + robot.talk('boop') + '</p>');

},{"./robot":"9WgEjc"}]},{},[1])
```

And then finally take a look at:

[/assets/sklarg.js](http://localhost:3000/assets/sklarg.js)

```javascript
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var robot = require('./robot');

$('body').append('<p>' + robot.talk('sklarg') + '</p>');

},{"./robot":2}],2:[function(require,module,exports){
module.exports = {
  getName: function() {
    return this.name || 'AcmeBot';
  },

  setName: function(n) {
    this.name = n;
  },

  talk: function (s) {
    return this.getName() + ' says ' + s.toUpperCase() + '!'
  }
}

},{}]},{},[1])
```

Note that `beep.js` and `boop.js` do not have the contents of the `robot.js` module. In contrast, `sklarg.js` does have the contents as does `common.js`. This is our `browserify.yml` file:

```yaml
debug: true
javascript:
  common:
    require:
      - ./robot
  beep:
    external:
      - ./robot
  boop:
    external:
      - ./robot
```

From that, it is clear that we correctly set `common` to [require](https://github.com/substack/node-browserify#brequirefile-opts) `./robot` along with having `beep` and `boop` having `./robot` as [external](https://github.com/substack/node-browserify#bexternalfile). But we forgot to set `sklarg` -- so `sklarg` has a reference to a different instance of the `./robot` module in memory and that is why it has a name of `AcmeBot` instead of `Robbie` (`AcmeBot` is the default robot name). To understand that more, look at how we set the robot name in `common.js` to `Robbie`.

## Note

We are stuck on browserify v4 if you require `require`/`external` support. An issue has been opened on `node-browserify` for this here:

https://github.com/substack/node-browserify/issues/1019
