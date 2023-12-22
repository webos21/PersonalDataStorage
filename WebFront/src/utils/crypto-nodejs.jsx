const crypto = import('crypto');

var Cipher = {
    iv: 'PasswordBook1234',
    key: 'PasswordBook',
    encrypt: function (msg) {
        console.log('crypto::encrypt called....');
        try {
            let bufIv = Buffer.from(this.iv);
            let sha256 = crypto.createHash('sha256');

            sha256.update(this.key);

            let aesCipher = crypto.createCipheriv('aes-256-cbc', sha256.digest(), bufIv);
            aesCipher.update(msg);

            let cryptBytes = aesCipher.final();
            let base64Result = cryptBytes.toString('base64');

            return base64Result;
        } catch (err) {
            console.error(err);
            return '';
        }
    },
    decrypt: function (msg) {
        console.log('crypto::decrypt called....');
        try {
            let bufIv = Buffer.from(this.iv);
            let sha256 = crypto.createHash('sha256');

            sha256.update(this.key);

            let aesDecipher = crypto.createDecipheriv('aes-256-cbc', sha256.digest(), bufIv);
            let dec = aesDecipher.update(msg, 'base64', 'utf8');

            return dec + aesDecipher.final('utf8');
        } catch (err) {
            console.error(err);
            return '';
        }
    }
};

export { Cipher };
