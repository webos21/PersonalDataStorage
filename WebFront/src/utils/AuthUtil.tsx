function makeAuthHeader(args?: Record<string, string>): Headers {
    const header = new Headers({
        Authorization: 'Basic ' + btoa('username:password'),
        ...args
    });

    const authKey = localStorage.getItem('auth.key');
    const authVal = localStorage.getItem('auth.val');

    if (authKey && authVal) {
        header.append(authKey, authVal);
    }

    return header;
}

export { makeAuthHeader };
