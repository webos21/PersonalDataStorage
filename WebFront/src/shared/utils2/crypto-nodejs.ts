// library
import * as crypto from 'crypto';

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
        logger.debug('crypto::encrypt called....');
        try {
            const bufIv = Buffer.from(this.iv);
            const sha256 = crypto.createHash('sha256');

            sha256.update(this.key);

            const aesCipher = crypto.createCipheriv('aes-256-cbc', sha256.digest(), bufIv);
            aesCipher.update(msg);

            const cryptBytes = aesCipher.final();
            return cryptBytes.toString('base64');
        } catch (err) {
            logger.error(err);
            return '';
        }
    },
    decrypt: function (msg: string): string {
        logger.log('crypto::decrypt called....');
        try {
            const bufIv = Buffer.from(this.iv);
            const sha256 = crypto.createHash('sha256');

            sha256.update(this.key);

            const aesDecipher = crypto.createDecipheriv('aes-256-cbc', sha256.digest(), bufIv);
            const dec = aesDecipher.update(msg, 'base64', 'utf8');

            return dec + aesDecipher.final('utf8');
        } catch (err) {
            logger.error(err);
            return '';
        }
    }
};

export { Cipher };
