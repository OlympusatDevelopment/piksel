# Piksel
An open source interface for embedding a piksel player on your page and interacting with its api. This simplifies the implementation process by abstraction.

* NOTE: This documentation is incomplete and will be updated when the package has been developed a little more.

* IMPORTANT: It's critical thatyou are using the HTML5 player in Piksel for the Javascript library to work. You can find this setting here: https://ovp.piksel.com/admin/projects/projectConfiguration.php
If you are currently using the AppStudio Flash player, it is safe to upgrade the player to HTML5. You won't have to reembed your player. DOn't trust me though, test it first. ;)
Beware too that when you save these settings that the Single Player is still selected in the General Settings sections at the bottom of the settings page. It has unselected itself on Update. If this happens the player will not load on the page.

#### Examples from Piksel support
https://jsfiddle.net/yxt290L9/

https://jsfiddle.net/shaolintibo/wdt0Lko6/

https://jsfiddle.net/ujxes910/

https://jsfiddle.net/ym5eLb99/


#### Import
```
import { Piksel } from 'piksel';
```

#### Instantiate the player
Each instance of the player adds a new player to the DOM for you, in the specified wrapper element. The element must exist or the Piksel class will throw an error.

```
new Piksel({ 
    basePlayerUrl: "https://player.piksel.com",
    playerID: 'pikselPlayer', 
    videoUUID: [YOUR VIDEO ID HERE],  
    injectID: 'pikselPlayer',
    clientAPI: null,
    projectID: null,
    unmutedByDefault: true,
    de: {
      "color-default": 'f4c441',
      "color-hover": 'f46741',
      "googleads-disable" : true,
      start: '900',
      end: '930',
      volume: '100',// Must be a string value 0-100 0=mute
      autoplay: true, 
      width: '900px',    
      height: '600px'
    }
  })
  .then(pikselPlayer => {
    console.log("Wrapper Player Instance ", pikselPlayer);
    console.log("Piksel Player Instance ", pikselPlayer._player);

    document.body.addEventListener(`piksel__pikselPlayer`, e => {
      // console.log("EVT piksel__pikselPlayer ", e);
    });
  
    document.body.addEventListener(`piksel__playing`, e => {
      console.log("EVT piksel__playing ", e);
    });
  
    document.body.addEventListener(`piksel__volumechange`, e => {
      console.log("EVT piksel__volumechange ", e);
    });
  });

```

The above instance expect there to be a div on the DOM with an id of "video-wrapper"
```
<div id="video-wrapper"></div>
```

#### Options
See this for a reference: https://faith.piksel.com/admin/help/PikselFaithHTML5/Content/Topics/Players/HTML_5_Player_Parameters/08PlayerParameters.htm

```
basePlayerUrl: null,
videoUUID: null,
playerID: '1234',
clientAPI: null,
projectID: null,
unmutedByDefault: true,// if present as true, the player in autoplay mode will start unmuted. See this for the rationale: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
autoplay: false,// LEGACY
startTime: false,// LEGACY : in seconds. (Works only with autoplay)
endTime: false,// LEGACY : in seconds. 
defaultVolume: null,// LEGACY : Must be a string value
theme: {// LEGACY
  defaultControlsColor: null, // hex string
  defaultControlsHoverColor: null, // hex string
},

width: null,// LEGACY :
height: null,// LEGACY :
injectID: null,
overrideURL: null,
addonUrlParams: 'de-googleads-disable=true&my-other-param=false' // separate url params with an ampersand.
```

#### Methods
These exist on the player instance.

##### play()
##### pause()
##### getCurrentTime()
##### setCurrentTime([time int in seconds])
##### speedUp()
##### speedDown()
##### getCurrentRate()
##### getCurrentVolume()
##### mute()
##### unmute()
##### volumeUp()
##### volumeDown()

#### Events
There are two types of events that exist on the document.body element.
1. A player id based event that is fired anytime there is a player event.
```piksel__PLAYERID```
2. A specific event that can be listened to, to reduce noise. ```piksel__EVENTNAME```. See below for the event names.

##### Event Names
* 'playing' 
* 'pause' 
* 'seeking'
* 'seeked'
* 'timeupdate'
* 'volumechange'
* 'ended'
* 'error'
* 'loadstart'

```
  document.body.addEventListener(`piksel__1234`, e => {
  });

  document.body.addEventListener(`piksel__playing`, e => {
  });

  document.body.addEventListener(`piksel__volumechange`, e => {
  });

```


#### Resources
After instantiating the player, you have access to the `_player` object on the instance. This `_player` prop contains the original player, made available in case you need extended interaction with the core player. 

Here are the docs where you'll find info about what's available on the player. [http://docs.videojs.com/docs/api/player.html](http://docs.videojs.com/docs/api/player.html)



##### Additional Options
Pass any of these parameters to the `de` object on the instance options, without the `de-` prefix.

|Parameter Name|Display Name in Console|Description|Options|Default Value|
|--- |--- |--- |--- |--- |
|de-countdown|Enable Countdown Plugin|Enables the countdown plugin.|True/False|True|
|de-cd-timer|DEHTML5 Enable Countdown Timer|Enables a countdown timer prior to the start of the live broadcast. The default is for the timer to be enabled. If you do not want a timer you will need to add this parameter with a False option.|True/False|True|
|de-cd-text-size|Countdown Text Size|Allows you to set the text size of your countdown timer to 12 point, 14 point or 18 point size text.|12, 14, 18|12|
|de-cd-text-color|Countdown Text Color|Allows you to set the color of your countdown timer. Use the hex value of your chosen color to set the option.|Hex value of colour.|#FFFFFF|
|de-cd-text-weight|Countdown Text Weight|Allows you to display your timer in either normal or bold text.|bold,normal|normal|
|de-cd-location|Countdown Text Location|Allows you to change the position of your countdown timer.|top,middle,bottom|middle|
|de-cd-background|DEHTML5 Countdown Background Image|Allows you to add a background image to your countdown.|Image||
|de-bumper-rate|Pre-Roll Occurance|Pre-roll can run before the countdown timer is shown, after the countdown nears the start of the live event, or both.| Before Countdown, After Countdow, Both|Before Countdown|
|de-bumper-live|Play Pre-Roll for Late Viewers|Force pre-roll to play for viewers who connect to the live event after it started|True/False|False|
|de-event-complete|DEHTML5 Event Completed Message|Allows you to change the default message that displays at the end of your live event.|Text|Thank you for watching. The event has ended.|
|de-endOnDuration|DEHTML5 End Live Stream Upon Duration||True/False||
|de-dvr-window|DEHTML5 DVR Window (In Minutes)||Number|120|
|de-dvr-start|DEHTML5 Start at Beginning of DVR||True/False|False|
|de-live-question|DEHTML5 Questionnaire form in player|Enables question form in live player to allow viewers to submit questions to a defined email location.|True/False|False|
|de-live-emailRec|Email recipient|The email address of the recipient of question forms in player. Requires DEHTML5 Questionnaire form in player to be enabled.|Text||
|de-live-emailSub|Email Subject|Subject line text for emails from question form in player. Requires DEHTML5 Questionnaire form in player to be enabled.|Text||
|de-series-uuid|Live Series UUID|The DE Live Series UUID|Text||
|de-event-uuid|Live Event UUID|The DE Live Event UUID|Text||
||||||
