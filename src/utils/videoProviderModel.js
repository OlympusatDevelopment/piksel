import _ from 'underscore';


const videoProviderModel = {

    get: args => new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", args.url);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
    })
};

export default videoProviderModel;