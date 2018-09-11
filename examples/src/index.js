// import Piksel from '../../src/index.js';
import { Piksel } from '../../lib/piksel.js';

(function() { 
  new Piksel({ 
    basePlayerUrl: "https://player.piksel.com",
    playerID: 'pikselPlayer', 
    videoUUID: 'w3md497g',  
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


})(); 