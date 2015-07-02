/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */


var Settings = require('settings');
var UI = require('ui');
var Vector2 = require('vector2');


// Set a configurable with the open callback
Settings.config(
    {
        url: 'http://hazard.local/pebblejs-master/config?maxdr='+Settings.option('maxdr'),
        autoSave: true
    },
    function(e) {
        console.log('opening configurable');

        console.log(JSON.stringify(e.options));

        // Reset color to red before opening the webview
        //Settings.option('color', 'red');
    },
    function(e) {
        console.log('closed configurable');

        // Show the parsed response
        console.log(JSON.stringify(e.options));

        if(e.options.length > 0){
            Settings.option(e.options);
        }



        // Show the raw response if parsing failed
        if (e.failed) {
            console.log(e.response);
        }

        //setConfig();
    }
);

var dr = Settings.option('maxdr');

if(typeof dr === 'undefined'){
    dr = '-';
}

console.log(dr);

var main = new UI.Window({ fullscreen: true });
var image = new UI.Image({
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    image: 'images/custom/vaultboy-ok.png'
});

main.add(image);

var timeTextField = new UI.TimeText({
    position: new Vector2(52, -2),
    size: new Vector2(100, 20),
    color: 'green',
    font: 'LECO_32_BOLD_NUMBERS',
    text: '%H%M',
    textAlign: 'left'
});
main.add(timeTextField);

var statusTextField = new UI.TimeText({
    position: new Vector2(48, 146),
    size: new Vector2(83, 12),
    color: 'green',
    font: 'GOTHIC_14_BOLD',
    text: 'OK: DR '+dr+'/'+dr+'+'+1,
    textAlign: 'right'
});
main.add(statusTextField);

main.show();

/*main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});*/
