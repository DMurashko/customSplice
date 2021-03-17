function immutableSplice(array, start, deleteCount) {
	const result = [];
	const removed = [];
	const argsLen = arguments.length;
	const arrLen = array.length;
	let i, k;

	// Follow spec more or less
	start = parseInt(start, 10);
	deleteCount = parseInt(deleteCount, 10);

	// Deal with negative start per spec
	// Don't assume support for Math.min/max
	if (start < 0) {
		start = arrLen + start;
		start = (start > 0) ? start : 0;
	} else {
		start = (start < arrLen) ? start : arrLen;
	}

	// Deal with deleteCount per spec
	if (deleteCount < 0) {
		deleteCount = 0;
	}

	if (deleteCount > (arrLen - start)) {
		deleteCount = arrLen - start;
	}

	// Copy members up to start
	for (i = 0; i < start; i++) {
		result[i] = array[i];
	}

	// Add new elements supplied as args
	for (i = 3; i < argsLen; i++) {
		result.push(arguments[i]);
	}

	// Add those after start + deleteCount
	for (i = start + (deleteCount || 0); i < arrLen; i++) {
		result.push(array[i]);
	}

	// Return new updated array
	return result;
}

//*** May be used for further refactorings ***
// Copy removed items to removed array
// for (i = start; i < start + deleteCount; i++) {
// 	removed.push(array[i]);
// }

//Testing the function

const testArray = [5, 240, 'test1', 'test2', 4, 11, 19];

const destinationArray = immutableSplice(testArray, 3, 1, 55555, 'devil', 'angel');

console.log(destinationArray, 'is equal:', testArray === destinationArray);