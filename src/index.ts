import { roundDecimal } from './roundDecimal.mjs';

// create a class for kwikMaffs
export class KwikMaffs {

    constructor() {
        this.roundDecimal = this.roundDecimal.bind(this);
    }
    roundDecimal(number: number, p: number) {
        roundDecimal(number, p);
    }
};