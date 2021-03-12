
const INIT_APP = 'INIT_APP';

const initApp = (...args) => {
    return {
        type: INIT_APP,
        ...args
    }
}

export {
    INIT_APP,
    initApp,
}
