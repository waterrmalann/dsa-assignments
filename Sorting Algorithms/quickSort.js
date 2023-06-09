// Implementation of Quick Sort in JavaScript

function pivot(arr, start = 0, end = arr.length - 1) {
    // Get the value at our pivot point, which we assume as our first element.
    let pivotValue = arr[start];
    // We start the swapping index at the pivot point.
    let swapIndex = start;

    // We start a loop from the second element in the (sub)array.
    for (let i = swapIndex + 1; i <= end; i++) {
        if (arr[i] < pivotValue) {
            // If the pivot value is less than element we're iterating over.
            // We increment the swap index and swap the two elements (i and swapIndex).
            swapIndex++;
            [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
        }
    }

    // At the end we can swap the pivot value (start) to the last swap index,
    // moving it forward.
    [arr[swapIndex], arr[start]] = [arr[start], arr[swapIndex]];

    // and return the swap index,
    return swapIndex;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
    // Base case to make sure that we only go recursively deep,
    // if the left pointer is less than right pointer
    if (left < right) {
        // Find an anchor value and move smaller elements to its left,
        // larger elements to its right.
        let pivotPoint = pivot(arr, left, right);

        // Recursively sort the left half of the array.
        quickSort(arr, left, pivotPoint - 1);

        // Recursively sort the right half of the array.
        quickSort(arr, pivotPoint + 1, right);
    }

    // Return the final array at the end.
    return arr;
}