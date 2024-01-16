import { roundDecimal } from "../roundDecimal";

describe('Tests for round decimal', () => {

    it('should round a number to the specified precision', () => {

        const numberToRound = 1.0234214; 
        const precision = 3;
        const result = roundDecimal(numberToRound, precision);
        expect(result).toEqual(1.023);

    });

    it("should round up a number to the specified precision", () => {
            
            const numberToRound = 1.333445; 
            const precision = 3;
            const result = roundDecimal(numberToRound, precision);
            expect(result).toEqual(1.334);
    
        });

    it('should round a trailing number to the correct whole number', () => {

        const numberToRound = 1.99999999; 
        const precision = 2;
        const result = roundDecimal(numberToRound, precision);
        expect(result).toEqual(2);

    });
});