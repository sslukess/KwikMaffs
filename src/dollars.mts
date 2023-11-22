
export const roundDown = (num: number, precision: number) => {
    const factor = Math.pow(10, precision)
    return Math.floor(num * factor) / factor
};

// this function is used to clean and trailing zeros off the cents after calculation 
export const cleanCents = (num: number | null) => Math.floor(num || 0);

// This function is used to convert all the dollar values to cents for more exact mathematical calculations
export const toCents = (num: number | null) => {

    const zeroSafeNum = num || 0; // if the number is null, then we will just use 0

    const numString = zeroSafeNum?.toString(); //convert to string

    // check if the string contains a decimal point 
    if (numString && !numString?.includes('.')) { // does not contain a decimal point, so its a whole number

        return cleanCents(zeroSafeNum * 100); // just pump that number up - no tricky stuff here! 

    } else if (numString && numString?.split('.').length === 2) { // if there is only one decimal point 

        const numStringSplit = numString.split('.'); // split that sting into whole number and fractional parts

        const dollarsString = numStringSplit[0]; // the whole dollars amount
        const centsString = numStringSplit[1].slice(0, 2); // just the 2 cents (truncated, and cuts anything that may be after the 2nd decimal place e.g. $12.995 -> 1299c)
        const trailingZeroCentsString = (numStringSplit[1][1] === undefined) ? '0' : ''; // if the second decimal place is a zero, then we need to add it back in, otherwise we will miss it 

        const totalAmountInCents = `${dollarsString}${centsString}${trailingZeroCentsString}`; // the total amount in cents

        const totalCentsAmountInNumber = parseInt(totalAmountInCents); // convert the string to a number

        return cleanCents(totalCentsAmountInNumber); // clean the cents (shouldn't be needed, but to be double sure), and return then number
    };

    // ok now something weird is going on as we seem to have multiple decimals or some other quackery, lets run a try catch and 
    let tryToParse: number | null = null;
    try { tryToParse = cleanCents(zeroSafeNum * 100); } catch (e) { tryToParse = null; };

    return tryToParse; // We did our best... 
};

// this function converts back to dollars once we want to show the result. 
export const toDollars = (num: number | null) => {
    // clean the cents and then divide by 100 to get the dollar value
    return cleanCents(num) / 100;
};