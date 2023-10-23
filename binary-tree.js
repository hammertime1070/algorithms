class Node {
    constructor(value) {
        this.value = value || null
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(array) {
        this.array = [...new Set(array.sort((a,b) => a-b))]
        this.root = this.buildTree(this.array)
    }

    buildTree(array) {
        if (!array.length) return null;
        // find middle of array
        let mid = Math.floor(array.length / 2)
        // set mid to root
        let root = new Node(array[mid])
        // left recursion
        root.left = this.buildTree(array.slice(0, mid))
        // right recursion
        root.right = this.buildTree(array.slice(mid+1))
        return root
    }
    insert(value) {
        if (!this.root) {
            this.root  = new Node(value);
        }
        let workingNode = this.root;
        while(true) {
            if (value < workingNode.value) {
                if (!workingNode.left) {
                    workingNode.left = new Node(value)
                    return
                }
                workingNode = workingNode.left
            } else if (value >= workingNode.value) {
                if (!workingNode.right) {
                    workingNode.right = new Node(value)
                    return
                }
                workingNode = workingNode.right
            } 
        }
    }

    printTree() {
        let queue = [];
        if (this.root !== null) {
            queue.push(this.root);
        }
        
        while (queue.length > 0) {
            let levelSize = queue.length;
            let currentLevel = [];
    
            for (let i = 0; i < levelSize; i++) {
                let currentNode = queue.shift();
                currentLevel.push(currentNode ? currentNode.value : null);
    
                if (currentNode) {
                    queue.push(currentNode.left);
                    queue.push(currentNode.right);
                }
            }
    
            // Only print if there's a non-null value in the current level
            if (currentLevel.some(v => v !== null)) {
                console.log(currentLevel.join(' '));
            }
        }
    }
    delete(value) {vh
        let currentNode = this.root
        let parentNode = null
        if (currentNode.value === value) {
            const index = this.array.indexOf(value)
            if (index !== -1) {00
                this.array.splice(index, 1)
            }
            this.root = this.buildTree(this.array)
            return
        }
        while (currentNode) {
            if (value < currentNode.value) {
                parentNode = currentNode
                currentNode = currentNode.left
            } else if (value > currentNode.value) {
                parentNode = currentNode
                currentNode = currentNode.right
            } else {
                // Add if the rest of the logic
                // This should represent when I have 
                // found the value to delete
                // Two children case
                if (currentNode.left && currentNode.right) {
                    // handle 2 child case
                    let successor = currentNode.right;
                    let successorParent = currentNode;
                    while (successor.left) {
                        successorParent = successor;
                        successor = successor.left;
                    }
                    currentNode.value = successor.value
                    if (successorParent.left === successor) {
                        successorParent.left = successor.right
                    } else {
                        successorParent.right = successor.right
                    }
                    successor = null
                    break
                } else if (currentNode.left || currentNode.right) {
                    if (currentNode.left) {
                        // left side
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = currentNode.left
                        } else {
                            parentNode.right = currentNode.left
                        }
                    } else {
                        // right side
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = currentNode.right
                        } else {
                            parentNode.right = currentNode.right
                        }
                    }
                } else {
                    // No children case
                    if (currentNode.value < parentNode.value) {
                        parentNode.left = null
                    } else {
                        parentNode.right = null
                    }
                    currentNode = null
                }
            }
        }
    }
    
}

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
tree.printTree(tree.root)