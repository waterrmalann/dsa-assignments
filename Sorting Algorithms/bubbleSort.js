// A simple, optimized bubble sort implementation in JavaScript.

function bubbleSort(arr) {
    let len = arr.length;  // keep track of the length.
    let swapped = false; // keep track of if any swaps were made.
    for (let i = 0; i < len - 1; i++) {
        // Loop through all the elements of the array.
        // We did `len - 1` because otherwise an unnecessary pass will be made at the end.
        
        // We assume that no swap is taking place this pass.
        swapped = false;
        for (let j = 0; j < len - i - 1; j++) {
            // Loop from start to `len - i - 1`
            // This will ensure the loop runs one item less everytime,
            // a nice little optimization.
            if (arr[j] > arr[j + 1]) {
                // If the current element is greater than the next element,
                // we swap those two elements and set `swapped` to true.
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        if (!swapped) {
            // If we haven't swapped anything in this pass,
            // we can short-circuit and break the loop early.
            break;
        }
    }
    
    // We finally return the sorted array.
    return arr;
}