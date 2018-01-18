import {
    PIKSEL_API_KEY,
    PIKSEL_ENDPOINT
} from './config';
import videoProviderModel from './utils/videoProviderModel';


/** 
 * Object for 
 * the config argument is the main configuration object passed to the instantitation
 * @param options
 * @constructor
 */
const VideoProvider = config=>{
    config = {
        endpointURL: null,
        apiKey: null,
        pingInterval: null,
        startTime: null,
        endTime: null
    };
    
    const _getEndpointURL = (providerType)=>{
        return PIKSEL_ENDPOINT
            .replace('{APP_TOKEN}', '')
            .replace('{PROJECT_UUID}', '');
    };
    
    const _getEmbedCode = (endpointURL)=>{
        return videoProviderModel.get({url: endpointURL})
            .then(res=> {
                return btoa(res.WsEmbedResponse.embedcode);
            });
    };
    
    const _init = ()=>{
        const endpointURL = _getEndpointURL();

        _getEmbedCode(endpointURL);
    };

    return {
      test: ()=>{
        console.log('HELLO!?');
      },

      getEmbedCode: ()=>{
        return _getEmbedCode();
      },

      publishEvents: ()=>{

      },

      play: ()=>{

      },

      pause: ()=>{

      },

      skip: ()=>{
        
      },

      dispatchPlayTime: ()=>{

      }
    };
  };
  
  
  export default VideoProvider;