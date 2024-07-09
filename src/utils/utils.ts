const extractErrorMessage = (errorString: string): string => {
	const match = errorString.match(/Argument `(\w+)`: (.*)/);
	if (match) {
		return `${match[1]}: ${match[2]}`;
	}
	return 'Invalid input data: ' + errorString;
};
//test
export { extractErrorMessage };
