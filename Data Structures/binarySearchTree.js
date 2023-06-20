// JavaScript Implementation of Binary Search Tree (w/ DFS, BFS)

class Node {
    constructor(value) {
        // We hold a value for each node.
        this.value = value;
        // A left pointer to the smaller node.
        this.left = null;
        // A right pointer to the larger node.
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        // We hold the root/starting node.
        this.root = null;
    }

    // Insert a node to the BST.
    insert(value) {
        // Create the new node for insertion.
        let newNode = new Node(value);
        // If we have no root, we simply set the root.
        if (!this.root) {
            this.root = newNode;
            return this;
        }
        
        // We start from the root of the BST.
        let current = this.root;
        // A loop that runs until we break it from the inside.
        while (true) {
            // If the value to be inserted is greater than the current node.
            if (value > current.value) {
                // We need to go deeper to the right. We check if a node exists to the right.
                if (current.right) {
                    // If so, we go deeper right.
                    current = current.right;
                } else {
                    // If not, we set that as our new node and return.
                    current.right = newNode;
                    return this;
                }
            }
            // If the value to be inserted is less than the current node. 
            else if (value < current.value) {
                // We need to go deeper to the left. We check if a node exists to the left.
                if (current.left) {
                    // If so, we go deeper left.
                    current = current.left;
                } else {
                    // If not, we set that as our new node and return.
                    current.left = newNode;
                    return this;
                }
            }
            // If the value to be inserted is equal to current node (duplicate).
            else {
                // We do not handle duplicates in our pure BST.
                return undefined;
            }
        }
    }

    // Remove a node from the BST.
    remove(value) {
        this.root = this._removeItem(this.root, value);
    }
    
    // Helper function to aid node removal.
    _removeItem(node, value) {
        if (!node) return null;

        // If the target value is less than the value of the node
        if (value < node.value) {
            // We need to go deeper to the left.
            node.left = this._removeItem(node.left, value);
        }
        // If the target value is greater
        else if (value > node.value) {
            // We need to go deeper to the right.
            node.right = this._removeItem(node.right, value);
        }
        // If the target value is equal to the node we have.
        else {
            // Case 1: We have a leaf node,
            // ie: A node with no children.
            if (!node.left && !node.right) return null;

            // Case 2: We have a node with one child,
            if (node.left && !node.right) {
                return node.left;
            } else if (node.right && !node.left) {
                return node.right;
            }

            // Case 3: We have a node with two children,
            // Find the smallest value of the right subtree
            // (or alternatively largest value of left subtree)
            let minRight = this.min(node.right);
            node.value = minRight.value;

            // Remove the minimum node from the right subtree.
            node.right = this._removeItem(node.right, minRight.value);
        }
        
        return node;
    }

    // Return whether a node exists or not in the BST.
    find(value) {
        // We start from the root node.
        let current = this.root;
        // We loop for as long the current node is a valid node.
        while (current) {
            // If the value we're looking for is greater than the current value.
            if (value > current.value) {
                current = current.right;
            }
            // If the value is less than the current value
            else if (value < current.value) {
                current = current.left;
            }
            // If the value is equal, viola!
            else {
                return true;
            }
        }
        
        // We haven't found any node that matched.
        return false;
    }

    // Returns the minimum child from a given root.
    min(node) {
        // If there is no node to the left, we hit a base case.
        if (!node.left) {
            // Return the parent node.
            return node;
        } else {
            // Else, recursively go deeper.
            return this.min(node.left);
        }
    }

    // Returns the maximum child from a given root.
    max(node) {
        // If there is no node to the right, we hit a base case.
        if (!node.right) {
            // Return the parent node.
            return node;
        } else {
            // Else, recursively go deeper.
            return this.min(node.right);
        }
    }

    // Runs breadth-first-search on the BST.
    bfs() {
        // Initialize an array to hold the elements in breadth first order.
        let data = [];
        // Initialize a queue with the root node.
        let queue = [this.root];
        // Run a loop for as long as the queue is not empty.
        while (queue.length) {
            // Dequeue to get the first node in queue.
            let current = queue.shift();
            // Push the value into the data array.
            data.push(current.value);

            // Enqueue the left node if it exists.
            current.left && queue.push(current.left);
            // Enqueue the right node if it exists.
            current.right && queue.push(current.right);
        }

        // Return the data array.
        return data;
    }

    // Runs pre-order depth-first-search on the BST.
    dfsPreOrder() {
        // Initialize an array to hold the values in pre-order.
        let data = [];
        // Helper function to recursively run the search.
        function dfs(node) {
            if (node) {
                // Push the value to the data array.
                data.push(node.value);
                // Recursively run `dfs()` on the left and right nodes.
                dfs(node.left);
                dfs(node.right);   
            }
        }
        // Initialize the function on the root node.
        dfs(this.root);
        return data;
    }

    // Runs in-order depth-first-search on the BST.
    dfsInOrder() {
        // Initialize an array to hold the values in sorted order.
        let data = [];
        // Helper function to recursively run the search.
        function dfs(node) {
            if (node) {
                // Recursively run `dfs()` on the left node first.
                dfs(node.left);
                // Push the value to the data array.
                data.push(node.value);
                // Then run the function on the right node.
                dfs(node.right);   
            }
        }
        // Initialize the function on the root node.
        dfs(this.root);
        return data;
    }

    // Runs post-order depth-first-search on the BST.
    dfsPostOrder() {
        // Initialize an array to hold the values in post order.
        let data = [];
        // Helper function to recursively run the search.
        function dfs(node) {
            if (node) {
                // Recursively run `dfs()` on the left node and right nodes first.
                dfs(node.left);
                dfs(node.right);
                // Push the value to the data array.
                data.push(node.value);
            }
        }
        // Initialize the function on the root node.
        dfs(this.root);
        return data;
    }
}