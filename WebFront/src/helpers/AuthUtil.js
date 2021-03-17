
function makeAuthHeader(...args) {
    let header = new Headers({
        'Authorization': 'Basic ' + btoa('username:password'),
        ...args
    });
    header.append(localStorage.getItem('authKey'), localStorage.getItem('authVal'));

    return header;
}

export {
    makeAuthHeader,
}
