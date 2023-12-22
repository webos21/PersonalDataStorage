function makeAuthHeader(...args) {
    let header = new Headers({
        Authorization: 'Basic ' + btoa('username:password'),
        ...args
    });
    header.append(localStorage.getItem('auth.key'), localStorage.getItem('auth.val'));

    return header;
}

export { makeAuthHeader };
