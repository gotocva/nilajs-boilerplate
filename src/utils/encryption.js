import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // 32 bytes for AES-256
const iv = crypto.randomBytes(16); // 16 bytes for AES

// Encrypt function
export const encrypt = (text) => {
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${encrypted}:${iv.toString('hex')}`;
};


//decrypt function
export const decrypt = (encryptedText) => {
    const [encrypted, ivHex] = encryptedText.split(':');
    let decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};