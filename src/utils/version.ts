export const getVersion = () => {
    return 123;
}

export const myDomain = () => {
    return window.location.hostname.split('.').slice(-2).join('.');
}