import axios from 'axios';


const pikselModel = {

  getEmbed: args => new Promise((resolve, reject) => {
    return axios({ url: '//player.olympusattelecom.com/v/vt20g3y0?wmode=transparent&r=true&autoPlay=true' })
      .then(resolve)
      .catch(resolve);
  }),

  // getPlayerStatus: args => new Promise((resolve, reject) => {
  // })


};

export default pikselModel;