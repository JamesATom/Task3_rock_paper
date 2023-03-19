const { Console } = require('console');
const { Transform } = require('stream');

class Table {
    constructor() {
        this.arr = [];
    }
    
    prepareTable(input) {
        let sizeOfWinLoss = Math.trunc(input.length / 2), ndx2 = 0;
        input.forEach(each => {
            this.arr.push({Move: each});                                                                                                    
        });                                                                                                                                 
        input.forEach((i, ndx, arr) => {
            let check = 0;
            for (let each of this.arr) {
                each[arr[ndx]] = (each.Move != arr[ndx] ? (check + sizeOfWinLoss < input.length + ndx && ndx < check) ? 'Loss' : 'Win' : 'Draw'); 
                check++;            
            }
        });                                                 
    }

    display(input) {
        this.prepareTable(input);    
        const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
        const logger = new Console({ stdout: ts })
        logger.table(this.arr)
        const table = (ts.read() || '').toString()
        let result = '';
        for (let row of table.split(/[\r\n]+/)) {
            let r = row.replace(/[^┬]*┬/, '┌');
            r = r.replace(/^├─*┼/, '├');
            r = r.replace(/│[^│]*/, '');
            r = r.replace(/^└─*┴/, '└');
            r = r.replace(/'/g, ' ');
            result += `${r}\n`;
        }
        console.log(result);
    }
}   


module.exports.Table = Table;


