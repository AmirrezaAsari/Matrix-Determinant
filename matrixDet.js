const fs = require('fs');

function parseMatrixFromFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const rows = fileContent.trim().split('\n');
    const matrix = rows.map(row => row.split(' ').map(Number));
    return matrix;
}

function swapRows(matrix, i, j) {
    const temp = matrix[i];
    matrix[i] = matrix[j];
    matrix[j] = temp;
}

function GaussianElimination(matrix) {
    const n = matrix.length;

    if (n !== matrix[0].length) {
        throw new Error('Input matrix must be square (nxn)');
    }

    let det = 1;

    for (let i = 0; i < n; i++) {
        // Find pivot
        let pivotRow = i;
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(matrix[j][i]) > Math.abs(matrix[pivotRow][i])) {
                pivotRow = j;
            }
        }

        // Swap rows if necessary
        if (pivotRow !== i) {
            swapRows(matrix, i, pivotRow);
            // Change sign because of row swap
            det *= -1;
        }

        // If the pivot element is zero, the determinant is zero
        if (matrix[i][i] === 0) {
            return 0;
        }

        det *= matrix[i][i];

        // Eliminate other elements below the pivot
        for (let j = i + 1; j < n; j++) {
            const factor = matrix[j][i] / matrix[i][i];
            for (let k = i; k < n; k++) {
                matrix[j][k] -= factor * matrix[i][k];
            }
        }
    }

    return det;
}

// Example usage
const filePath = '2.txt';

const matrix = parseMatrixFromFile(filePath);
const det = Math.floor(GaussianElimination(matrix));
console.log(`Gaussian Elimination : ${det}`);
