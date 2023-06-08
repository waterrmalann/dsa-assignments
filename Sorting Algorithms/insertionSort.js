// Simple implementation of insertion sort in JavaScript.

function insertionSort(arr) {
    // We start from the element at index of 1 and look backwards.
    for (let i = 1; i < arr.length; i++) {
        // We store the value of where we started.
        let temp = arr[i];
        // Calculate the index of the element before.
        let prev = i - 1;
        // As long as prev is greater than or equal to 0 (base condition)
        // and, the value we're holding in `temp` is less than the value
        // of the element right before it.
        while (prev >= 0 && temp < arr[prev]) {
            // We push that value forwards, swapping it with the element next to it.
            arr[prev + 1] = arr[prev]
            // Also decrement previous index.
            prev--;
        }
        // We then put our `temp` at the index we made a gap at,
        // as we were pushing elements forward.
        arr[prev + 1] = temp;
    }
    // Finally, we return the sorted array.
    return arr;
}