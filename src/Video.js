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
class Video {
    constructor(options) {
        this.options.videoID = null,
        this.options.providerType  = null,
        this.options.providerType  = null,
        this.options.startTime = null,
        this.options.endTime = null 
    };
    
    const _getEndpoint = (apiUrl)=>{
        return apiUrl;
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
        return _getEndpoint();
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