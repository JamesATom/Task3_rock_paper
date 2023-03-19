const process = require('process');
const readline = require('readline');
const { Table } = require('./table.js');
const { Hmac } = require('./hmac.js');
const { Rules } = require('./menu.js');

const newTable = new Table();
const newHmac = new Hmac();

class Menu extends Rules {
        showMenu() {
            newHmac.generateHmac();
            console.log('HMAC: ', newHmac.getHmac());
            console.log('Available Moves: ');
            this.arr.forEach((each, ndx) => console.log(`${ndx + 1} - ${each}`));
            console.log('0 - exit', '\n? - help');
        }

        getComputerMove = () => Math.floor(Math.random() * this.arr.length) + 1;

        isWinner(pMove, comMove) {
            if (comMove == pMove) {
                console.log("It is draw");
            } else if (pMove + this.getHalfLength() > this.arr.length) {
                let temp2, temp = this.arr.length - pMove;
                temp2 = this.getHalfLength() - temp;
                console.log(((this.arr.length >= comMove && pMove <= comMove) || (1 <= comMove && temp2 >= comMove)) ? 'You lost!' : 'You win!');
            } else {
                console.log('You win!');
            }
        }

        showChoices() {
            const rl = readline.createInterface(process.stdin, process.stdout);
            rl.setPrompt('Enter your move: ');
            rl.prompt();
            rl.on('line', (choice) => {
                let comMove;
                if (choice == 0) {
                    process.exit();
                } else if (choice >= 1 && choice <= this.arr.length) {
                    comMove = this.getComputerMove();
                    console.log(`Your move: ${this.arr[choice-1]}`);
                    console.log(`Computer's move: ${this.arr[comMove-1]}`);
                    this.isWinner(choice, comMove);
                    console.log(`HMAC key: ${newHmac.generateHmacKey(this.arr[comMove-1])}`);
                    rl.close();
                } else if (choice == '?') {
                    newTable.display(this.arr); 
                } else {
                    console.log("Invalid move!!!");
                    rl.prompt();
                }
            });

        }

}

const gameMenu = new Menu();
const inputs = process.argv.slice(2);
gameMenu.validateInput(inputs);
gameMenu.showMenu();
gameMenu.showChoices();