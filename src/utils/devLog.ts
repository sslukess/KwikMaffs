export const devLog = (...args: any[]): void => {
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {
        console.log(...args);
    }
};