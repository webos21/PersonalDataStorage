import * as nodeCrypto from './crypto-nodejs.jsx';
import * as libCrypto from './crypto-library.jsx';

const Cipher = crypto && crypto.createHash ? nodeCrypto.Cipher : libCrypto.Cipher;

export default Cipher;
