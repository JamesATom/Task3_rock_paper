
class Rules {
    constructor() {
        this.arr = [];
        this.arrHalfLength = undefined;
    }

    setInputs(arr) {
        this.arr = arr;
        this.arrHalfLength = arr.length / 2;
    };

    getHalfLength() {
        return this.arrHalfLength;
    }

    getInputs() {
        return this.arr;
    }

    giveExample() {
        console.log('For Example: Rock Paper Scissors or Rock Paper Scissors Lizard Spock or 1 2 3 4 5 6 7 8 9');
    }

    giveExample2() {
        console.log('Given input should be greater than or equal to 3 and odd number of values !!!');
    }

    warningIfRepeating() {
        console.log('Given input should be non-repeating strings');
        this.giveExample();
        process.exit();
    }

    validateInput(arrOfInputs) {
        (arrOfInputs.length >= 3 && arrOfInputs.length % 2 == 1 ? this.validateNonRepeating(arrOfInputs)
            : this.giveExample2() || this.giveExample());
    }

    validateNonRepeating(arrOfInputs) {
        arrOfInputs.forEach((each, ndx) => {
            arrOfInputs.includes(each, ndx + 1) ? this.warningIfRepeating() : this.setInputs(arrOfInputs);
        });
    }
}   

module.exports.Rules = Rules;