
// import KwikMaffs from 'KwikMaffs';   
import {KwikMaffs} from "KwikMaffs"; 
import readline from 'readline';

const kwikMaffs = new KwikMaffs();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Please specify a number to round: ', (number) => {
    kwikMaffs.roundDecimal(number, 2);
    rl.close();
  });


