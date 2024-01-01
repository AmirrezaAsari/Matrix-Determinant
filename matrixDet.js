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

    return Math.floor(det);
}


function rowAndColumn(matrix) {
    const n = matrix.length;

    if (n !== matrix[0].length) {
        return undefined;
    }

    if (n === 1) {
        return Math.floor(matrix[0][0]);
    }

    if (n === 2) {
        return Math.floor(matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]);
    }

    let det = 0;

    for (let i = 0; i < n; i++) {
        const subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
        const sign = i % 2 === 0 ? 1 : -1;
        det += sign * matrix[0][i] * rowAndColumn(subMatrix);
    }
    return Math.floor(det);
}

function rezaieFar(matrix) {
    const n = matrix.length;
    if (n === 1) {
        return Math.floor(matrix[0][0]);
    }
    else if (n === 2) {
        return Math.floor(matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]);
    }
    else {
        const mat1 = matrix.slice(1, n).map(row => row.slice(1));
        const mat2 = matrix.slice(1, n).map(row => row.slice(0, -1));
        const mat3 = matrix.slice(0, -1).map(row => row.slice(1));
        const mat4 = matrix.slice(0, -1).map(row => row.slice(0, -1));
        const denominator = matrix.slice(1, -1).map(row => row.slice(1, -1));
        const numerator = [
            [rezaieFar(mat1), rezaieFar(mat2)],
            [rezaieFar(mat3), rezaieFar(mat4)],
        ];
  
        const det = rezaieFar(denominator);

        return Math.floor((numerator[0][0] * numerator[1][1] - numerator[0][1] * numerator[1][0]) / det);
    }
}


const filePath = 'test.txt';

const matrix = parseMatrixFromFile(filePath);
const detGaussian = GaussianElimination(matrix);
const detRowCol = rowAndColumn(matrix);
const detRezaieFar = rezaieFar(matrix);
console.log(`Gaussian Elimination : ${detGaussian}`);
console.log(`row and column : ${detRowCol}`);
console.log(`Rezaie Far : ${detRezaieFar}`);