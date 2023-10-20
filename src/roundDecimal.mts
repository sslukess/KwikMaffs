const handleTenOnRound = (digitArray: string[], d: number, p: number) => {

    console.log('handling ten on round');
    console.log('digit array: ', digitArray);
    if (d === 10) {
        digitArray[digitArray.length - 1] = Number(0).toString(); // set the last value as 0 
        const newDigitBeforeLast = (Number(digitArray[digitArray.length - 2]) + 1) || 0; // this is the digit before the last digit with 1 added as the last digit was 10
        console.log('new digit before last: ', newDigitBeforeLast);
        if (newDigitBeforeLast === 10) { // if the digit before the last digit is 10, we need to round again`
            digitArray.pop(); // kick off the last digit
            handleTenOnRound(digitArray, newDigitBeforeLast, p); // otherwise, handle the next digit
        } else { // if the digit before the last digit is not 10, we can just add 1 to it
            digitArray[digitArray.length - 2] = newDigitBeforeLast.toString(); // add 1 to the digit before the last digit
        }
    } else if (d < 10) {
        digitArray[digitArray.length - 1] = d.toString(); // replace the last digit with the target number
    } else if (d > 10) {
        console.log('something went wrong!'); // this should never happen
    }
};

const roundArray = (digitArray: string[], p: number) => {

    console.log('rounding this array: ', digitArray);
    //control number is the last element of the array 
    const controlNumber = Number(digitArray[digitArray.length - 1]); // this is the final digit, and will determine what we do with the digit before it
    console.log('control number: ', controlNumber);

    let targetNumber = Number(digitArray[digitArray.length - 2]); // this is the number we are rounding
    if (controlNumber >= 5) {
        targetNumber += 1; // add 1 to the digit before the last digit  
        console.log('added 1 to the digit before the last digit');
    } else if (controlNumber < 5) { // do nothing
        console.log('did not add 1 to the digit before the last digit');
    }

    // Clean up 
    digitArray.pop(); // remove that last digit now we are done with it. 
    handleTenOnRound(digitArray, targetNumber, p); // handle the last digit, this is for if the final digit is 10 and we need to turn it into 0 and add 1 to the digit before it
    console.log('new array: ', digitArray);

    if (digitArray.length <= p) return; // return when we have reached p

    roundArray(digitArray, p); // round the array again if we have not reached p 
};

export const roundDecimal = (number: number, p: number) => {

    if (!Number.isInteger(p) || p < 0) return; // return if the precision is not an integer OR is less than 0

    const numberString = number.toString(); // turn the number into a string
    const indexOfPoint = numberString.indexOf('.') ? numberString.indexOf('.') : null; // find the decimal if it exists

    if (!indexOfPoint) { // return if no decimal
        console.log('No decimal in number');
        return;
    }

    const slicedDecimalString = numberString.slice(indexOfPoint + 1) // the decimals of the string 
    const slicedWholeNumberString = numberString.slice(0, indexOfPoint); // the whole number of the string
    const decimalArray = slicedDecimalString.split(""); // turn the decimals into an array

    roundArray(decimalArray, p);  // round the array 

    const roundedDecimalString = decimalArray.join(""); // turn the array back into a string
    const reunitedString = `${slicedWholeNumberString}.${roundedDecimalString}`; // put the whole number and the decimals back together
    const finalNumber = Number(reunitedString); // turn the string back into a number
    console.log(`The number ${numberString} returns ${finalNumber} when rounded to ${p} decimal places.`)

    return finalNumber;
}





