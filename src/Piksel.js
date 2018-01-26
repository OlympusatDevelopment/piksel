// import {
//     PIKSEL_API_KEY,
//     PIKSEL_ENDPOINT
// } from './options';
import pikselModel from './models/pikselModel';
import Promise from 'bluebird';

// const piksel = {
//   play:()=>{},
//   pause: ()=>{},
//   load:()=>{},
//   seekFwd: ()=>{},
//   seekBack:()=>{},
//   skipTo: (seconds)=>{},
//   startAt: (seconds)=>{},
//   endAt: (seconds)=>{}  
//   }
/** 
 * Object for 
 * the options argument is the main optionsuration object passed to the instantitation
 * @param options
 * @constructor options
 */
class Piksel {
  constructor(options) {
    this.options = Object.assign({}, {
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
      _script: null
    }, options);

    this.options._callbackFnName = `callback__${this.options.playerID}`;
    this.options._appid = `${this.options.playerID}__instance`;
    this.events = {
      onReady: () => { }
    };

    return this._initPlayer(this.options);
  }

  _initPlayer(options) {
    return new Promise((resolve, reject) => {
      // Clean the base url if needed
      if (this.options.basePlayerUrl.charAt(this.options.basePlayerUrl.length - 1) === '/') {
        this.options.basePlayerUrl = this.options.basePlayerUrl.slice(0, -1);
      }
      this.options['_playerUrl'] = this._makePlayerUrl();
      this._script = this._makePlayerScript(this.options);

      // Now that we've built the script, inject it
      this._injectScript(
        this.options.injectID,
        this._script
      );

      this._script.onerror = reject;

      // Once the player has loaded the video, set the context and resolve
      this.events.onReady = player => {
        this.playerReady = true;

        /**
         * Play/pause, etc are in the prototype
         * NOTE: This player is the SAME as the window.player_manager.playerInstances[this.options._appid]
         */
        this.player = player;

        resolve(this);// Resolve our Class, NOT the player itself
      }

      // This is our global callback used by the player script
      window[this.options._callbackFnName] = this.events.onReady;
    });
  }

  /**
   * Check for the embed element and add inject the script in the embed
   * @param {*} elemId 
   * @param {*} script 
   */
  _injectScript(elemId, script) {
    const injectElement = document.getElementById(elemId);

    if (!injectElement) {
      throw new Error(`The injectID (#${this.options.injectID}) does not reference a valid element on the DOM`);
    }
    // const wrapper = document.createElement('div');
    // const wrapperId = `${this.options.injectID}-${this.options.playerID}__wrapper`;
    // wrapper.setAttribute('id', wrapperId);

    // Double wrap the script to prevent "Unexpected token errors in React"
    // injectElement
    //   .appendChild(wrapper);
    injectElement
      .appendChild(script);

    // document.getElementById(wrapperId)
    //   .appendChild(script);
  }


  publishEvents() {
  }

  play() { this.player.play(); }
  pause() { this.player.pause(); }
  speedIncrease() { this.player.playbackRate(this.getCurrentRate() + 0.5); }
  speedDecrease() { this.player.playbackRate(this.getCurrentRate() - 0.5); }
  getCurrentRate() { return this.player.playbackRate(); }

  skip() {
  }

  dispatchPlayTime() {
  }

  _makePlayerUrl() {
    if (this.options.overrideURL) {
      return this.options.overrideURL;
    } else {
      let base = '';

      if (this.options.projectID) {
        base = `${this.options.basePlayerUrl}/p/${this.options.projectID}`;
      } else if (this.options.videoUUID) {
        base = `${this.options.basePlayerUrl}/v/${this.options.videoUUID}`;
      }

      return `${base}?embed=js&de-callback-method=${this.options._callbackFnName}&de-html-default=true&targetId=${this.options.injectID}&de-appid=${this.options._appid}`
    }
  }

  _makePlayerScript({ playerID, _playerUrl }) {
    let script = document.createElement("script");
    script.setAttribute("src", _playerUrl);
    script.async = 1;
    script.setAttribute("id", playerID);

    return script;
  }
}

export default Piksel;