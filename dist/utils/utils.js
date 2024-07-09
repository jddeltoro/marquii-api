"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractErrorMessage = void 0;
const extractErrorMessage = (errorString) => {
    const match = errorString.match(/Argument `(\w+)`: (.*)/);
    console.log(match);
    if (match) {
        return `${match[1]}: ${match[2]}`;
    }
    return 'Invalid input data: ' + errorString;
};
exports.extractErrorMessage = extractErrorMessage;
