/* Util functions for project */

/* Used to label blocks */
function generateNumericID () {
    return Math.floor( Math.random() * 10000000000 )
}

/* Finds the index to insert a value so that arr is still sorted */
function binaryInsertIndex ( arr, value, value_func){
    return findBinaryInsertionIndex( arr, value, 0, arr.length, value_func)
}

function findBinaryInsertionIndex( arr, value, low, high, value_func ){

    if ( high <= low + 1 ){
        if ( arr.length == 0)
            return 0
        if ( value < value_func(arr[low]) )
            return low
        else
            return high;
    }

    let mid = Math.floor( ( high + low )/ 2)
    
    if ( value_func(arr [mid]) <= value )
        return findBinaryInsertionIndex(arr, value, mid, high, value_func)
    else
        return findBinaryInsertionIndex(arr, value, low, mid, value_func)

}

function swapValues ( arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}


module.exports = { generateNumericID, binaryInsertIndex, swapValues }