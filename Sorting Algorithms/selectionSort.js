// Simplified implementation of Selection Sort in JavaScript.

function selectionSort(arr) {
    // We loop over the entire array.
    for (let i = 0; i < arr.length; i++) {
        // We assume the lowest value to be at index position `i`.
        let lowest = i;
        // We run a loop from `i + 1` till the end of the array.
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[lowest]) {
                // If there is an element which is less than our lowest element,
                // we replace the lowest with that element, our new minimum.
                lowest = j;
            }
        }

        if (i !== lowest) {
            // If the minimum element is not the current element, we swap.
            // Otherwise the swap is unnecessary/redundant.
            [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
        }
    }

    // Finally, we return the sorted array.
    return arr;
}