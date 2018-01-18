import {
    PIKSEL_API_KEY,
    PIKSEL_ENDPOINT
} from './config';

/** 
 * Object for 
 * the config argument is the main configuration object passed to the instantitation
 * @param options
 * @constructor
 */
const Video = options => {
    options = {
        videoID: null,
        providerType: null,
        startTime: null,
        endTime: null
    };
    
    const _createEndpoint = ()=>{
        
    };

    const _createIFrameHTML = ()=>{

    };
    
    const _init = ()=>{
        
    };

    return {
      test: ()=>{
        console.log('HELLO!?');
      },

      getEmbedCode: ()=>{

      },

      subscribeEvents: ()=>{

      },

      play: ()=>{

      },

      pause: ()=>{

      },

      skip: ()=>{

      },

      end: ()=>{

      },

      dispatchPlayTime: ()=>{

      }
    };
  };
  
  
  export default Video;