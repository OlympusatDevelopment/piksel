import Promise from 'bluebird';

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
      embedCode: null,
      playerReady: false,
      playerID: Math.floor(Math.random() * 100000),
      clientAPI: null,
      projectID: null,

      autoplay: false,
      startTime: false,// in seconds. (Works only with autoplay)
      endTime: false,// in seconds. 
      defaultVolume: null,// Must be a string value
      theme: {
        defaultControlsColor: null, // hex string
        defaultControlsHoverColor: null, // hex string
      },

      width: null,
      height: null,
      injectID: null,
      overrideURL: null,
      _script: null,
      _player: null,
      _injectElement: null
    }, options);

    this.options._callbackFnName = `callback__${this.options.playerID}`;
    this.options._appid = `${this.options.playerID}__instance`;
    this.events = {
      onReady: () => { }
    };

    return this._initPlayer(this.options);
  }

  play() { this._player.play(); }
  pause() { this._player.pause(); }
  getCurrentTime() { return this._player.currentTime(); }
  setCurrentTime(time) { this._player.currentTime(time); }
  speedUp() { this._player.playbackRate(this.getCurrentRate() + 0.5); }
  speedDown() { this._player.playbackRate(this.getCurrentRate() - 0.5); }
  getCurrentRate() { return this._player.playbackRate(); }
  getCurrentVolume() { return this._player.volume(); }
  mute() { this._player.volume(0); }
  volumeUp() { this._player.volume(this._player.volume() + 0.1); }
  volumeDown() { this._player.volume(this._player.volume() - 0.1); }


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
        this._playerReady = true;

        /**
         * Play/pause, etc are in the prototype
         * NOTE: This player is the SAME as the window.player_manager.playerInstances[this.options._appid]
         */
        this._player = player;
        this._proxyEvents(this._player.el_.children[0]);

        resolve(this);// Resolve our Class, NOT the player itself
      }

      // This is our global callback used by the player script
      window[this.options._callbackFnName] = this.events.onReady;
    });
  }

  _makePlayerUrl() {
    if (this.options.overrideURL) {
      return this.options.overrideURL;
    } else {
      let base = '';

      // Decide if we're loading a project id or video/program id
      if (this.options.projectID) {
        base = `${this.options.basePlayerUrl}/p/${this.options.projectID}`;
      } else if (this.options.videoUUID) {
        base = `${this.options.basePlayerUrl}/v/${this.options.videoUUID}`;
      }

      return this._buildPlayerOptions(
        `${base}?embed=js&de-callback-method=${this.options._callbackFnName}&de-html-default=true&targetId=${this.options.injectID}&de-appid=${this.options._appid}`,
        this.options
      );
    }
  }

  _makePlayerScript({ playerID, _playerUrl }) {
    let script = document.createElement("script");
    script.setAttribute("src", _playerUrl);
    script.async = 1;
    script.setAttribute("id", playerID);

    return script;
  }

  /**
 * Check for the embed element and inject the script in the embed
 * @param {*} elemId 
 * @param {*} script 
 */
  _injectScript(elemId, script) {
    this._injectElement = document.getElementById(elemId);

    if (!this._injectElement) {
      throw new Error(`The injectID (#${this.options.injectID}) does not reference a valid element on the DOM`);
    }

    this._injectElement
      .appendChild(script);
  }

  _buildPlayerOptions(url, options) {
    let _tmpUrl = url;
    const appendOption = str => option => `${str}&${option}`;

    // @todo create a map of the property name and the 'de-' parameter name, then loop through and set, instead of manually conditioning these
    if (options.autoplay) { _tmpUrl = appendOption(_tmpUrl)(`de-autoPlay=${options.autoplay}`); }
    if (options.defaultVolume) { _tmpUrl = appendOption(_tmpUrl)(`de-volume=${options.defaultVolume}`); }
    if (options.startTime) { _tmpUrl = appendOption(_tmpUrl)(`de-start=${options.startTime}`); }
    if (options.endTime) { _tmpUrl = appendOption(_tmpUrl)(`de-end=${options.endTime}`); }
    if (options.theme.defaultControlsColor) { _tmpUrl = appendOption(_tmpUrl)(`de-color-default=${options.theme.defaultControlsColor}`); }
    if (options.theme.defaultControlsHoverColor) { _tmpUrl = appendOption(_tmpUrl)(`de-color-hover=${options.theme.defaultControlsHoverColor}`); }
    // if (options.loop) { _tmpUrl = appendOption(_tmpUrl)(`de-loop=${options.loop}`); }

    return _tmpUrl;
  }

  _proxyEvents(elem) {
    const self = this;
    const events = ['playing', 'pause', 'seeking', 'seeked', 'timeupdate', 'volumechange', 'ended', 'error', 'loadstart'];
    // document.body.addEventListener(`piksel__playing`, e => {
    //   console.log('piksel__timeupdate EVENT picked up', e, e.data.eventName, e.data.value);
    // });

    events.forEach(eventName =>
      elem.addEventListener(eventName, e => {
        let _tmpEvent = new Event(`piksel__${self.options.playerID}`);
        let _tmpEventSpecific = new Event(`piksel__${eventName}`);

        const data = {
          value: self._decideEventValue(eventName),
          timestamp: Date.now(),
          playerID: self.options.playerID,
          videoID: self.options.videoUUID,
          eventName
        };

        _tmpEvent.data = data;
        _tmpEventSpecific.data = data;

        // Dispatch the events to the document.
        document.body.dispatchEvent(_tmpEvent);
        document.body.dispatchEvent(_tmpEventSpecific);
      })
    );
  }

  _decideEventValue(eventName) {
    switch (eventName) {
      case 'timeupdate':
      case 'seeking':
      case 'seeked':
      case 'pause':
      case 'playing':
        return this._player.currentTime();
      case 'volumechange':
        return this._player.volume();
      default:
        return true;
    }
  }
}

export default Piksel;