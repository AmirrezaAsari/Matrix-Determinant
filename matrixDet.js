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
        return undefined;
    }

    let det = 1;

    for (let i = 0; i < n; i++) {
        let pivotRow = i;
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(matrix[j][i]) > Math.abs(matrix[pivotRow][i])) {
                pivotRow = j;
            }
        }

        if (pivotRow !== i) {
            swapRows(matrix, i, pivotRow);
            det *= -1;
        }

        if (matrix[i][i] === 0) {
            return 0;
        }

        det *= matrix[i][i];

        for (let j = i + 1; j < n; j++) {
            const factor = matrix[j][i] / matrix[i][i];
            for (let k = i; k < n; k++) {
                matrix[j][k] -= factor * matrix[i][k];
            }
        }
    }

    return det;
}


function rowAndColumn(matrix) {
    const n = matrix.length;

    if (n !== matrix[0].length) {
        return undefined;
    }

    if (n === 1) {
        return matrix[0][0];
    }

    if (n === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let det = 0;

    for (let i = 0; i < n; i++) {
        const subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
        const sign = i % 2 === 0 ? 1 : -1;
        det += sign * matrix[0][i] * determinant(subMatrix);
    }

    return det;
}

const filePath = 'undefined.txt';

const matrix = parseMatrixFromFile(filePath);
const detGaussian = GaussianElimination(matrix);
const detRowCol = rowAndColumn(matrix);
console.log(`Gaussian Elimination : ${detGaussian}`);
console.log(`row and column : ${detRowCol}`);
