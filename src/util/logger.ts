const logErrorMessage = (err: Error) =>
    console.log(`%c${err.message}`, `color: red; background-color: white; font-weight: bold`);

const createLogger = (fg: string, bg: string, table?: boolean) => {
    return function (...args: any[]) {
        const colorLog = (arg: any) =>
            console.log(`%c  ${arg}  `, `color: ${fg}; background-color: ${bg}; font-weight: medium`);
        args.forEach(arg => {
            if (typeof arg === 'object' && !Array.isArray(arg)) {
                try {
                    colorLog(JSON.stringify(arg, undefined, 2));
                } catch (e) {
                    logErrorMessage(e);
                    Object.keys(arg).forEach(key => colorLog(key));
                }
            } else {
                colorLog(arg);
            }
        });
    };
};

const errorMessage = logErrorMessage;
const blue = createLogger('#00EFFF', '#000000');
const gray = createLogger('#D1CED3', '#000000');
const green = createLogger('#00FF00', '#000000');
const mint = createLogger('#00FF93', '#000000');
const orange = createLogger('orange', '#000000');
const pink = createLogger('#ff00fa', '#000000');
const purple = createLogger('#C38DFF', '#000000');
const red = createLogger('#FF0000', '#000000');
const tan = createLogger('#E4C686', '#000000');
const violet = createLogger('#BCC7FC', '#000000');
const white = createLogger('#ffffff', '#000000');
const yellow = createLogger('#FBFF00', '#000000');

export const logger = {
    blue,
    gray,
    green,
    mint,
    orange,
    pink,
    purple,
    red,
    tan,
    violet,
    white,
    yellow,
    errorMessage,
};
