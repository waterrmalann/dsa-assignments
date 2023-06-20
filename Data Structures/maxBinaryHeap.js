class MaxBinaryHeap {
    constructor() {
        this.values = new Array();
    }

    // Insert a value into the heap.
    insert(value) {
        // Push the value into the heap.
        this.values.push(value);
        // We now need to bubble it up until it reaches the correct position.
        // The index position at which we have inserted the value.
        let indexPos = this.values.length - 1;
        while (true) {
            // Calculate the parent node position for the child.
            let parentPos = Math.floor((indexPos - 1) / 2);
            // Terminate the loop if there is no valid parent.
            if (!this.values[parentPos]) break;
            // Terminate the loop if parent is larger than our node.
            if (this.values[parentPos] >= this.values[indexPos]) break;

            // Swap the elements.
            [this.values[parentPos], this.values[indexPos]] = [this.values[indexPos], this.values[parentPos]];
            // Update the index position.
            indexPos = parentPos;
        }
        
        return this;
    }

    // Extract the largest value from the heap.
    extractMax() {
        const lastIndex = this.values.length - 1;
        // Swap the first and last elements.
        [this.values[0], this.values[lastIndex]] = [this.values[lastIndex], this.values[0]];
        // Pop the last value (which would be the largest at this point)
        let largest = this.values.pop();

        let indexPos = 0;
        // Sink down the first value to the correct position.
        while (true) {
            // Calculate the left child position.
            let leftChild = (indexPos * 2) + 1;
            // Calculate the right child position.
            let rightChild = (indexPos * 2) + 2;

            // The index position to swap to.
            let swapTo = indexPos;

            // Make sure the left child index is within bounds.
            if (leftChild < this.values.length) {
                // If the value of the left child is greater.
                if (this.values[leftChild] > this.values[swapTo]) {
                    swapTo = leftChild;
                }
            }
            
            // We also check the right child because we take the largest value out of both.
            // Make sure right child index is within bounds.
            if (rightChild < this.values.length) {
                // If the value of the right child is greater.
                if (this.values[rightChild] > this.values[swapTo]) {
                    swapTo = rightChild;
                }
            }

            // If our `swapTo` variable hasn't changed, we can break the loop.
            if (swapTo === indexPos) break;

            // Otherwise, we swap.
            [this.values[swapTo], this.values[indexPos]] = [this.values[indexPos], this.values[swapTo]];
            // Update the index position.
            indexPos = swapTo;
        }
        
        // Return the largest/max value.
        return largest;
    }
}