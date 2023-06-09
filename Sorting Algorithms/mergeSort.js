// Implementation of Mege Sort in JavaScript.

function merge(arr1, arr2) {
    // Function to merge two sorted arrays together.
    // We start our two pointers from the start of both arrays.
    let i = 0, j = 0;
    // We allocate a new array to hold the sorted values.
    let merged = new Array();
    // We loop as long as the two pointers are within the array.
    while (i < arr1.length && j < arr2.length) {
        // If value of `arr1[i]` < value of arr[j]
        if (arr1[i] < arr2[j]) {
            // Push that to the merged array
            merged.push(arr1[i]);
            // and increment `i`.
            i++;
        } else {
            // Otherwise, push the other value.
            merged.push(arr2[j]);
            // and increment `j`.
            j++;
        }
    }

    // Run a loop for the remaining elements in arr1.
    while (i < arr1.length) {
        // Push those to the merged array.
        merged.push(arr1[i]);
        i++;
    }

    // Run the same loop for the remaining elements in arr2.
    while (j < arr2.length) {
        // Push those to the merged array.
        merged.push(arr2[j]);
        j++;
    }

    // Return the merged array.
    return merged;
}

function mergeSort(arr) {
    // Base case to return array at.
    if (arr.length <= 1) return arr;
    
    // Find the middle of the array.
    let middle = Math.floor(arr.length / 2);
    // Recursively call `mergeSort` on the left half of the sliced array.
    let firstHalf = mergeSort(arr.slice(0, middle));
    // Recursively call `mergeSort` on the right half of the sliced array.
    let lastHalf = mergeSort(arr.slice(middle));

    // Return the merged result of both halves,
    // which would be sorted.
    return merge(firstHalf, lastHalf);
}