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
class VideoProvider {
    constructor() {
        let embedCode = null;
        let endpoint = null;

        this.config = {
            endpointURL: null,
            apiKey: null,
            pingInterval: null,
            startTime: null,
            endTime: null
        };
    }
    
    _getEndpointURL(providerType) {
        if(this.endpoint)
            return this.endpoint;

        return PIKSEL_ENDPOINT
            .replace('{APP_TOKEN}', this.config.apiKey)
            .replace('{PROJECT_UUID}', '');
    }
    
    _getEmbedCode(endpointURL){
        if(this.embedCode)
            return this.embedCode;

        return videoProviderModel.get({url: endpointURL})
            .then(res=> {
                console.log(btoa(res.WsEmbedResponse.embedcode)); // decode embed code from base64
                return btoa(res.WsEmbedResponse.embedcode);
            });
    }
    
    _init(){
        const endpointURL = _getEndpointURL();

        _getEmbedCode(endpointURL);
    }


    test(){
    console.log('HELLO');
    }

    getEmbedCode(){
        return _getEmbedCode();
    }

    publishEvents(){

    }

    play(){

    }

    pause(){

    }

    skip(){
    
    }

    dispatchPlayTime(){

    }
  }
  
  
  export default VideoProvider;