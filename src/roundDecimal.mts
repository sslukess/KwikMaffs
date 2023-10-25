const handleTenOnRound = (digitArray: string[], d: number, p: number, digitsAdded: number) => {

    console.log('handling ten on round');
    console.log('digit array: ', digitArray);
    console.log('control number: ', d);

    // check if the array is long enough, i.e. 2 or more length. If it isn't we need to do a special case where we round the single number, and add one 
    const isLongEnough = digitArray.length >= 2;
    console.log('is long enough: ', isLongEnough);

    if (isLongEnough) { // we only do this for arrays with 2 or more digits
        if (d === 10) {
            digitArray[digitArray.length - 1] = Number(0).toString(); // set the last value as 0 
            const newDigitBeforeLast = (Number(digitArray[digitArray.length - 2]) + 1) || 1; // this is the digit before the last digit with 1 added as the last digit was 10
            console.log('new digit before last: ', newDigitBeforeLast);
            if (newDigitBeforeLast === 10) { // if the digit before the last digit is 10, we need to round again`
                digitArray.pop(); // kick off the last digit
                handleTenOnRound(digitArray, newDigitBeforeLast, p, digitsAdded); // otherwise, handle the next digit
            } else { // if the digit before the last digit is not 10, we can just add 1 to it
                digitArray[digitArray.length - 2] = newDigitBeforeLast.toString(); // add 1 to the digit before the last digit
            }
        } else if (d < 10) {
            digitArray[digitArray.length - 1] = d.toString(); // replace the last digit with the target number
        } else if (d > 10) {
            console.log('something went wrong!'); // this should never happen
        }
    } else { // this is the special case where the array is only 1 digit long, so we need to round the single digit and add 1
        if (d === 10) {
            const newDigitBeforeLast = (Number(digitArray[0]) + 1) || 0; // this is the digit before the last digit with 1 added as the last digit was 10
            digitArray[0] = newDigitBeforeLast.toString(); // add 1 to the digit before the last digit
            // note: this works as the final result will be [10], which when coerced to string and then number, will be 10
            digitsAdded += 1; // set digit added to true so we know we have added a digit
        } else {
            // do nothing
        }
    };
};

const roundArray = (digitArray: string[], p: number, digitsAdded: number) => {

    if (digitArray.length <= p) return; // first check we aren't already at the precision we want

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
    handleTenOnRound(digitArray, targetNumber, p, digitsAdded); // handle the last digit, this is for if the final digit is 10 and we need to turn it into 0 and add 1 to the digit before it
    console.log('new array: ', digitArray);

    if (digitArray.length <= p) return; // return when we have reached p

    roundArray(digitArray, p, digitsAdded); // round the array again if we have not reached p 
};

export const roundDecimal = (number: number, p: number) => {

    if (!Number.isInteger(p) || p < 0) return; // return if the precision is not an integer OR is less than 0

    const numberString = number.toString(); // turn the number into a string
    const indexOfPoint = numberString.indexOf('.') ? numberString.indexOf('.') : null; // find the decimal if it exists
    let digitsAdded = 0; // this is used later incase we need to add a digit to the number

    if (!indexOfPoint) { // return if no decimal
        console.log('No decimal in number');
        return;
    }

    // now we have the decimal point, we can slice the string into the whole number and the decimals
    const slicedDecimalString = numberString.slice(indexOfPoint + 1) // the decimals of the string 
    const slicedWholeNumberString = numberString.slice(0, indexOfPoint); // the whole number of the string

    // in order to round the number, we need to remove the decimal point, round the number, and then add the decimal point back in
    // this is for the special case where 19.999 to two decimal places returns 20.00, so we round the whole numbers even if the precision is for decimals

    const deDecimalString = numberString.replace('.', ''); // remove the decimal point from the numberString

    const deDecimalArray = deDecimalString.split(""); // turn the deDecimalString into an array

    // now we can round the whole thing
    roundArray(deDecimalArray, p + slicedWholeNumberString.length, digitsAdded); // round the array, shifting the precision by the length of the whole number so that can still give p for the number of decmials but it will round the whole number too if needed.

    const reDecimalStringRounded = deDecimalArray.join("");  // turn the array back into a string

    const newIndexOfDecimalPoint = indexOfPoint + digitsAdded; // find the new index of the decimal point

    let reDecimalStringRoundedWithPoint;

    // Now we either add in the point, or add padding if we somehow ended up in that situation e.g. 999.999 rounded to 2 decimal places = 1000.00
    if (reDecimalStringRounded.length >= newIndexOfDecimalPoint) {
        reDecimalStringRoundedWithPoint = `${reDecimalStringRounded.slice(0, newIndexOfDecimalPoint)}.${reDecimalStringRounded.slice(newIndexOfDecimalPoint)}`
    } else if (reDecimalStringRounded.length < newIndexOfDecimalPoint) {

        const numberOfPaddingZeros = newIndexOfDecimalPoint - reDecimalStringRounded.length + 1; // add one due to zero indexing... 
        const paddingZeros = Array(numberOfPaddingZeros).fill(0).join("");
        reDecimalStringRoundedWithPoint = `${reDecimalStringRounded}${paddingZeros}`;
    };

    const reDecimalNumberRounded = Number(reDecimalStringRoundedWithPoint); // turn the string back into a number

    console.log(`The number ${numberString} returns ${reDecimalNumberRounded} when rounded to ${p} decimal places.`)

    return reDecimalNumberRounded;

    // ---- 
    // TODO remove this: 
    // older version of the code, which did not round the whole number if the precision was for decimals

    // roundArray(decimalArray, p);  // round the array 

    // const roundedDecimalString = decimalArray.join(""); // turn the array back into a string
    // const reunitedString = `${slicedWholeNumberString}.${roundedDecimalString}`; // put the whole number and the decimals back together
    // const finalNumber = Number(reunitedString); // turn the string back into a number
    // console.log(`The number ${numberString} returns ${finalNumber} when rounded to ${p} decimal places.`)

    // return finalNumber;
}





