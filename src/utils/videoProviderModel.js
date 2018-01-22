import _ from 'underscore';


const videoProviderModel = {

    getEmbed: args => new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", args.url);
            xhr.onload = () => resolve(xhr.response);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
    }),
};

export default videoProviderModel;