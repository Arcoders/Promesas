
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (true) return reject(new Error('Hubo un error'));
        resolve('Hola mundo');
        reject(new Error('Hubo un error'));
    }, 2000);
});

promise.then(console.log).catch(console.log);

promise.then(res => {
    console.log(res);
}, err => {
    console.log(err);
});

promise.then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});

// --------------------------------------------------------------

function dumy() {
    if (Math.floor(Date.now() / 1000) % 2 === 0)
        return Promise.resolve('Hola mundo');
    return Promise.reject('Error');
}

dumy().then(console.log).catch(console.log);

// --------------------------------------------------------------

function GET(url) {
    return new Promise((resolve, reject) => {

        let ajaxCall = new XMLHttpRequest();

        ajaxCall.open('GET', url);

        ajaxCall.onload = () => {
            if (ajaxCall.status == 200) return resolve(ajaxCall.response);
            reject(Error(ajaxCall.status));
        };

        ajaxCall.onerror = err => {
            reject(err);
        };

        ajaxCall.send();

    });
}

function getUser(username) {
    return GET('https://api.github.com/users/' + username);
}

function getRepos(repos_url) {
    return GET(repos_url);
}

getUser('codigofacilito').then(res => {
    let repos = JSON.parse(res).repos_url;
    getRepos(repos).then(res => {
        console.log(res);
    });
}).catch(console.log);

let getUserPromise = getUser('codigofacilito');

let getReposPromise = getUserPromise.then(res => {
    return getRepos(JSON.parse(res).repos_url);
}).catch(console.log);

 getReposPromise.then(console.log).catch(console.log);

// --------------------------------------------------------------

getUserPromise.then(res => {
    console.log('Respuesta del usuario');
    console.log(res);
});

Promise.all([getUserPromise, getReposPromise]).then(([user, repos]) => {
    console.log('info user =====> ', user);
    console.log('info repos ====>', repos);
}).catch(err => console.log(err));

function getGithubUserInfo() {
    let getUserPromise = getUser('codigofacilito');
    let getReposPromise = getUserPromise.then(res => {
        return getRepos(JSON.parse(res).repos_url);
    }).catch(console.log);
    return Promise.all([getUserPromise, getReposPromise]);
}

getGithubUserInfo().then(([user, repos]) => {
    console.log('info user =====> ', user);
    console.log('info repos ====>', repos);
}).catch(err => console.log(err));

// --------------------------------------------------------------
