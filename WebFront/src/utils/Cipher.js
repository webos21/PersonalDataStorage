import * as nodeCrypto from './crypto-nodejs';
import * as libCrypto from './crypto-library';

const Cipher = crypto && crypto.createHash ? nodeCrypto.Cipher : libCrypto.Cipher;

export default Cipher;
