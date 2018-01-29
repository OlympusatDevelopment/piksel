### Piksel
An open source interface for embedding a piksel player on your page and interacting with its api. This simplifies the implementation process by abstraction.

* NOTE: This documentation is incomplete and will be updated when the package has been developed a little more.

* IMPORTANT: It's critical thatyou are using the HTML5 player in Piksel for the Javascript library to work. You can find this setting here: https://ovp.piksel.com/admin/projects/projectConfiguration.php
If you are currently using the AppStudio Flash player, it is safe to upgrade the player to HTML5. You won't have to reembed your player. DOn't trust me though, test it first. ;)

#### Examples
https://jsfiddle.net/yxt290L9/

https://jsfiddle.net/shaolintibo/wdt0Lko6/

https://jsfiddle.net/ujxes910/

https://jsfiddle.net/ym5eLb99/

#### Usage

##### Import
```
import { Piksel } from 'piksel';
```

##### Instantiate the player
Each instance of the player adds a new player to the DOM for you, in the specified wrapper element. The element must exist or the Piksel class will throw an error.

```
new Piksel({
  basePlayerUrl: "https://player.piksel.com",
  playerID: '[YOUR PLAYER ID HERE]',
  // videoUUID: '[YOUR VIDEO ID HERE]',
  projectID: '[YOUR PROJECT ID HERE]]',
  autoplay: true,
  width: '900px',
  height: '600px',
  injectID: 'video-wrapper'
})
  .then(pikselPlayer => {
    this.setState({ pikselPlayer });
    console.log('PLAY PROMISE RESOLVED', pikselPlayer);
  })
```

The above instance expect there to be a div on the DOM with an id of "video-wrapper"
```
<div id="video-wrapper"></div>
```

##### Options
```
basePlayerUrl: null,
videoUUID: null,
pingInterval: null,
startTime: null,
endTime: null,
embedCode: null,
playerReady: false,
playerID: Math.floor(Math.random() * 100000),
clientAPI: null,
projectID: null,
autoplay: false,
width: '900px',
height: '600px',
injectID: null,
overrideURL: false,
```

##### Methods
These exist on the player instance

###### Play
###### Pause
###### speedIncrease
###### speedDecrease
