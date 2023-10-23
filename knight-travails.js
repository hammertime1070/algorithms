class Board {
    constructor() {
        this.validMoves = [[-2, 1], [-2, -1], [2, 1], [2, -1], [-1, 2], [-1, -2], [1, -2], [1, 2]]
        this.board = boardInit()
    }



    boardInit() {
        let boardArray = []
        for (let i =0; i < 8; i++) {
            let row = []
            for (let j=0; j < 8; j++) {
                let square = new Square([i, j])
                row.push(square)
            }
            boardArray.push(row)
        }
        return boardArray
    }

    getNeighbors(square) {
        for (let move of this.validMoves) {
            let xPosition = square.id[0] + move[0]
            let yPosition = square.id[1] + move[1]
            if (0 > xPosition && xPosition > 7 && 0 > yPosition && yPosition > 7) {
                neighbor = this.getSquare([xPosition, yPosition])
                square.neighbors.push(neighbor)
            }
        }  
    }

    getSquare(id) {
        return this.board[id[0]][id[1]]
    }

    knightMoves(origin, target) {
        let queue = []
        let start = this.getSquare(origin)
        queue.push(start)
        target.explored = true
        while (queue.length > 0) {
            // Remove the first path from the queue
            let currentPath = queue.shift()
            // Get the last square from the current path
            let workingSquare = currentPath[currentPath.length - 1]
            if (this.arraysEqual(workingSquare.id, target)) {
                //convert list of squares to list of coordinates
                return currentPath.map(square => square.id)
            }
            this.getNeighbors(workingSquare)
            for (let neighbor of workingSquare.neighbors) {
                if (!neighbor.explored) {
                    neighbor.explored = true
                    let newPath = currentPath.concat([neighbor])
                    queue.push(newPath)
                }
            }
        }
        // No path found
        return null
    }
    
    arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
    
        for (let i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
}

class Square {
    constructor(id) {
        this.id = id
        this.explored = false
        this.neighbors = []
    }
}

