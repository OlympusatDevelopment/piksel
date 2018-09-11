// import Piksel from '../../src/index.js';
import { Piksel } from '../../lib/piksel.js';

(function() { 
  new Piksel({ 
    basePlayerUrl: "https://player.piksel.com",
    playerID: 'pikselPlayer', 
    videoUUID: 'w3md497g',  
    autoplay: true, 
    width: '900px',    
    height: '600px',
    injectID: 'pikselPlayer',
    startTime: '0',
    addonUrlParams: 'de-googleads-disable=true'
  });
})(); 