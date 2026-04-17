// library
import { SHA256, mode as cipherMode, AES, enc } from 'crypto-js';

// in-project
import logger from '@/shared/utils/logger';

export interface CipherInterface {
    iv: string;
    key: string;
    encrypt: (msg: string) => string;
    decrypt: (msg: string) => string;
}

const Cipher: CipherInterface = {
    iv: 'PasswordBook1234',
    key: 'PasswordBook',
    encrypt: function (msg: string): string {
        logger.debug('CryptoJS::encrypt called....');
        try {
            const bufIv = enc.Utf8.parse(this.iv);
            const key256 = SHA256(this.key);

            const options = { mode: cipherMode.CBC, iv: bufIv };

            const cryptRet = AES.encrypt(msg, key256, options);

            return cryptRet.ciphertext.toString(enc.Base64);
        } catch (err) {
            logger.error(err);
            return '';
        }
    },
    decrypt: function (msg: string): string {
        logger.debug('CryptoJS::decrypt called....');
        try {
            const bufIv = enc.Utf8.parse(this.iv);
            const key256 = SHA256(this.key);

            const options = { mode: cipherMode.CBC, iv: bufIv };

            const decryptRet = AES.decrypt(msg, key256, options);

            return decryptRet.toString(enc.Utf8);
        } catch (err) {
            logger.error(err);
            return '';
        }
    }
};

export { Cipher };
