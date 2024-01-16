const { toCents, cleanCents, toDollars } = require('../src/dollars');

// tests for Cent/Dollar conversion calculations 

describe('Tests for Cent/Dollar conversion calculations', () => {

    it('toCents should convert dollars to cents when the input is a decimal', () => {

        // $0.00
        expect(toCents(0)).toEqual(0);

        // $0.01
        expect(toCents(0.01)).toEqual(1);

        // $0.10
        expect(toCents(0.10)).toEqual(10);

        // $0.11
        expect(toCents(0.11)).toEqual(11);

        // $0.99
        expect(toCents(0.99)).toEqual(99);

        // $1.00
        expect(toCents(1.00)).toEqual(100);

        // $1.01
        expect(toCents(1.01)).toEqual(101);

        // $1.10
        expect(toCents(1.10)).toEqual(110);

        // $1.001
        expect(toCents(1.001)).toEqual(100);

        // $1.009
        expect(toCents(1.009)).toEqual(100);

        // $1.101
        expect(toCents(1.101)).toEqual(110);

        // $16.99 this is a problematic number
        expect(toCents(16.99)).toEqual(1699);
    });

    it('toCents should convert dollars to cents when the input is a whole number', () => {

        // $0
        expect(toCents(0)).toEqual(0);

        // $1
        expect(toCents(1)).toEqual(100);

        // $10
        expect(toCents(10)).toEqual(1000);

        // $100
        expect(toCents(100)).toEqual(10000);

        // $1000
        expect(toCents(1000)).toEqual(100000);
    });

    it('returns the correct number of trailing zeros for trailing zero cents', () => {
        
        // $0.00
        expect(toCents(0)).toEqual(0);

        // $0.10
        expect(toCents(0.10)).toEqual(10);

        // $0.01
        expect(toCents(0.01)).toEqual(1);

        // $0.001
        expect(toCents(0.001)).toEqual(0);

    });

    it('toCents should return $0 when the input is null', () => {

        // null 
        expect(toCents(null)).toEqual(0);
    });

    it('cleanCents removes all floating points', () => {

        // 100.0 cents 
        expect(cleanCents(100.0)).toEqual(100);

        // 100.00 cents
        expect(cleanCents(100.00)).toEqual(100);

        // 100.000 cents
        expect(cleanCents(100.000)).toEqual(100);

        // 100.0000 cents
        expect(cleanCents(100.0000)).toEqual(100);
    });

    it('convert to dollars returns the dollar amount', () => {

        // create new array of cents, from 0 to 2000 in steps of 1 
        const cents = Array.from(Array(2001).keys());

        // convert each cent to dollars and check if it is equal to the index
        cents.forEach((cent, index) => {

            const dollarValue = toDollars(cent);

            // check if the dollar value is equal to the index
            expect(dollarValue).toEqual(index / 100);
        });
    });

    it('convert to dollars returns 0 when the input is null', () => {

        // null 
        expect(toDollars(null)).toEqual(0);
    });

});