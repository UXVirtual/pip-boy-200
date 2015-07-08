/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */


var Settings = require('settings');
var UI = require('ui');
var Vector2 = require('vector2');

/*

    Apps Settings

 */


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

/*

    Global Vars

 */

var dr = Settings.option('maxdr');
var currentWindow = 0; //the currently displayed window
var menuItems = [];
var windows = [];
var defaultWindow = 0;

if(typeof dr === 'undefined'){
    dr = '-';
}

/*

    Global Event Listeners

*/



/*

    CND Screen

 */

function addCNDWindow(){
    var window = new UI.Window({ fullscreen: true });
    var bgImage = new UI.Image({
        position: new Vector2(0, 0),
        size: new Vector2(144, 168),
        image: 'images/custom/cnd-bg.png'
    });

    window.add(bgImage);

    var timeTextField = new UI.TimeText({
        position: new Vector2(52, -2),
        size: new Vector2(100, 20),
        color: 'green',
        font: 'LECO_32_BOLD_NUMBERS',
        text: '%H%M',
        textAlign: 'left'
    });
    window.add(timeTextField);

    var statusTextField = new UI.TimeText({
        position: new Vector2(48, 146),
        size: new Vector2(83, 12),
        color: 'green',
        font: 'GOTHIC_14_BOLD',
        text: 'OK: DR '+dr+'/'+dr+'+'+1,
        textAlign: 'right'
    });
    window.add(statusTextField);

    addMenuItems(window,'cnd');

    return window;
}

function addRADWindow(){
    var window = new UI.Window({ fullscreen: true });

    var bgImage = new UI.Image({
        position: new Vector2(0, 0),
        size: new Vector2(144, 168),
        image: 'images/custom/rad-bg.png'
    });

    window.add(bgImage);

    var timeTextField = new UI.TimeText({
        position: new Vector2(52, -2),
        size: new Vector2(100, 20),
        color: 'green',
        font: 'LECO_32_BOLD_NUMBERS',
        text: '%H%M',
        textAlign: 'left'
    });
    window.add(timeTextField);

    var statusTextField = new UI.TimeText({
        position: new Vector2(48, 146),
        size: new Vector2(83, 12),
        color: 'green',
        font: 'GOTHIC_14_BOLD',
        text: 'OK: DR '+dr+'/'+dr+'+'+1,
        textAlign: 'right'
    });
    window.add(statusTextField);

    addMenuItems(window,'rad');

    return window;
}

/*

    RAD Screen

 */

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

/*

    Misc Functions

*/

function hideCurrentWindow(){
    currentWindow.hide();
}

function addMenuItems(window,currentItem){

    if(typeof menuItems[window] === 'undefined'){
        menuItems[window] = [];
    }

    menuItems[window].concat(addMenuItem(window,'cnd','CND',10,25,24,14,(currentItem === 'cnd')));
    menuItems[window].concat(addMenuItem(window,'rad','RAD',10,45,24,14,(currentItem === 'rad')));
    menuItems[window].concat(addMenuItem(window,'eff','EFF',10,65,24,14,(currentItem === 'eff')));
    menuItems[window].concat(addMenuItem(window,'skl','SKL',10,85,24,14,(currentItem === 'skl')));
    menuItems[window].concat(addMenuItem(window,'spc','SPC',10,105,24,14,(currentItem === 'spc')));
    menuItems[window].concat(addMenuItem(window,'prk','PRK',10,125,24,14,(currentItem === 'prk')));
    menuItems[window].concat(addMenuItem(window,'buf','BUF',10,145,24,14,(currentItem === 'buf')));

    //select previous menu item
    window.on('click', 'up', function(e) {

        console.log('Pressed up button');

        //removeMenuItems(menuItems[window]);

        if(currentWindow-1 < 0){
            windows[windows.length-1];
            currentWindow = windows.length-1;
        }else{
            windows[currentWindow-1];
            currentWindow--;
        }

        windows[currentWindow].show();

        /*var menu = new UI.Menu({
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
        menu.show();*/
    });

    //enter current window menu
    window.on('click', 'select', function(e) {

        console.log('Pressed select button');

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

    //select next menu item
    window.on('click', 'down', function(e) {

        console.log('Pressed down button');

        /*var card = new UI.Card();
        card.title('A Card');
        card.subtitle('Is a Window');
        card.body('The simplest window type in Pebble.js.');
        card.show();*/
    });
}

function removeMenuItems(menuItems){

    for(var i = 0; i < menuItems.length; i++){
        window.remove(menuItems[i]);
    }
}

function addMenuItem(window,name,label,x,y,width,height,selected){

    if(selected){
        var highlightPosition;

        var yOffset = 5;

        switch(name){
            case 'cnd':
                highlightPosition = new Vector2(8, 22+yOffset);
                break;
            case 'rad':
                highlightPosition = new Vector2(8, 42+yOffset);
                break;
            case 'eff':
                highlightPosition = new Vector2(8, 62+yOffset);
                break;
            case 'skl':
                highlightPosition = new Vector2(8, 82+yOffset);
                break;
            case 'spc':
                highlightPosition = new Vector2(8, 102+yOffset);
                break;
            case 'prk':
                highlightPosition = new Vector2(8, 122+yOffset);
                break;
            case 'buf':
                highlightPosition = new Vector2(8, 142+yOffset);
                break;
        }

        var selectRectangle = new UI.Rect({
            position: highlightPosition,
            size: new Vector2(27, 15),
            backgroundColor: 'clear',
            borderColor: 'green'
        });

        window.add(selectRectangle);
    }

    var statusTextField = new UI.TimeText({
        position: new Vector2(x, y),
        size: new Vector2(width, height),
        color: (selected) ? 'green' : 'islamicGreen', //colors are camel cased
        font: 'GOTHIC_14_BOLD',
        text: label,
        textAlign: 'center'
    });

    window.add(statusTextField);

    return (selected) ? [statusTextField,selectRectangle] : [statusTextField];
}


windows.push(addCNDWindow());
windows.push(addRADWindow());

windows[0].show();