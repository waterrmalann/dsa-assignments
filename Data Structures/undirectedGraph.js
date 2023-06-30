// JavaScript implementation of an Undirected Graph using Adjacency List

class UndirectedGraph {
    constructor() {
        // The adjacency list stores the vertices and edges.
        this.adjacencyList = {};
    }

    // Populate the adjacency list from an edge list.
    fromEdgeList(edgeList) {
        for (let [s, e] of edgeList) {
            // Create vertices if they do not already exist.
            if (!(s in this.adjacencyList))
                this.adjacencyList[s] = [];
            if (!(e in this.adjacencyList))
                this.adjacencyList[e] = [];
            
            // Connect the vertices together.
            this.adjacencyList[s].push(e);
            this.adjacencyList[e].push(s);
        }
    }

    // Add a node/vertex.
    addVertex(v) {
        // If the vertex does not exist in our adjacency list.
        if (!(v in this.adjacencyList)) {
            this.adjacencyList[v] = [];
        }
    }

    // Connect two nodes with an edge.
    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    }

    // Remove an edge from the adjacency list.
    removeEdge(v1, v2) {
        this.adjacencyList[v1] = this.adjacencyList.filter(v=> v !== v2);
        this.adjacencyList[v2] = this.adjacencyList.filter(v=> v !== v1);
    }
    
    // Depth-First-Search w/ Stack (Iterative)
    dfs(start) {
        // Initialize the stack with the starting node.
        let stack = [start];
        // Mark the starting node as visited in oru `visited` set.
        let visited = new Set([start]);
        // Initialize a list to hold our data.
        let data = [];
        // As long as our stack has content.
        while (stack.length) {
            // Pop from the stack and push `data`
            let curr = stack.pop();
            data.push(curr);
            // Loop through all the neighbours of the current node.
            for (let neighbour of this.adjacencyList[curr]) {
                // If they are not visited
                if (!visited.has(neighbour)) {
                    // Mark them visited and push to stack
                    visited.add(neighbour);
                    stack.push(neighbour);
                }
            }
        }
        return data;
    }

    // Breadth-First-Search w/ Queue (Iterative)
    bfs(start) {
        // Initialize a queue with the starting node.
        let queue = [start];
        // Mark the starting node as visited in oru `visited` set.
        let visited = new Set([start]);
        // Initialize a list to hold our data.
        let data = [];
        // As long as the queue has content.
        while (queue.length) {
            // Dequeue and push the value to `data`
            let curr = queue.shift();
            data.push(curr);
            // Loop through all the neighbours of the current node.
            for (let neighbour of this.adjacencyList[curr]) {
                // Assuming they aren't visited, we mark and add them to the queue.
                if (!visited.has(neighbour)) {
                    visited.add(neighbour);
                    queue.push(neighbour);
                }
            }
        }
        return data;
    }
}