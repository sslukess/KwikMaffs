import { roundDecimal } from './roundDecimal.mjs';
import { toCents, toDollars, cleanCents } from './dollars.mjs';

// create a class for kwikMaffs
export class KwikMaffs {

    constructor() {
        this.roundDecimal = this.roundDecimal.bind(this);
        this.toCents = this.toCents.bind(this);
        this.toDollars = this.toDollars.bind(this);
        this.cleanCents = this.cleanCents.bind(this);
    }
    roundDecimal(number: number, p: number) {
        roundDecimal(number, p);
    }

    toCents(num: number | null) {
        toCents(num);
    }

    toDollars(num: number | null) {
        toDollars(num);
    }

    cleanCents(num: number | null) {
        cleanCents(num);
    }
    
};