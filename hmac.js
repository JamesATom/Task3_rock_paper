const crypto = require('crypto');

class Hmac {
    constructor() {
        this.hmac = undefined;
    }

    setHmac(hmac) {
        this.hmac = hmac;
    }

    getHmac() {
        return this.hmac;
    }

    generateHmac() {
        this.setHmac(crypto.createHash("SHA3-256").update(crypto.randomBytes(256).toString("hex")).digest("hex").toUpperCase());
    }

    generateHmacKey(comMove) {
        return crypto.createHash('sha3-256', this.hmac).update(comMove).digest('hex').toUpperCase();
    }
}


module.exports.Hmac = Hmac;