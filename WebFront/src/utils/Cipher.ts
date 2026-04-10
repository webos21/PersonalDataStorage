import * as nodeCrypto from './crypto-nodejs';
import * as libCrypto from './crypto-library';

declare const crypto: any;

const Cipher = typeof crypto !== 'undefined' && (crypto as any).createHash ? nodeCrypto.Cipher : libCrypto.Cipher;

export default Cipher;
