import { SHA256, mode as cipherMode, AES, enc } from "crypto-js";

var Cipher = {
    iv: "PasswordBook1234",
    key: "PasswordBook",
    encrypt: function (msg) {
        console.log("CryptoJS::encrypt called....");
        try {
            let bufIv = enc.Utf8.parse(this.iv);
            let key256 = SHA256(this.key);

            let options = { mode: cipherMode.CBC, iv: bufIv };

            let cryptRet = AES.encrypt(msg, key256, options);

            return cryptRet.ciphertext.toString(enc.Base64);
        } catch (err) {
            console.error(err);
            return "";
        }
    },
    decrypt: function (msg) {
        console.log("CryptoJS::decrypt called....");
        try {
            let bufIv = enc.Utf8.parse(this.iv);
            let key256 = SHA256(this.key);

            let options = { mode: cipherMode.CBC, iv: bufIv };

            let decryptRet = AES.decrypt(msg, key256, options);

            return decryptRet.toString(enc.Utf8);
        } catch (err) {
            console.error(err);
            return "";
        }
    }
}

export {
    Cipher,
}
