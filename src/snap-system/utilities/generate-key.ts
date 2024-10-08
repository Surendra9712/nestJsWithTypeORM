import * as fs from 'fs';
import * as crypto from 'crypto';

// Generate a private key
const privateKey = crypto.generateKeyPairSync('rsa', {
  modulusLength: 4096, // Adjust the key size as needed
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

// Specify the file path where you want to save the private key
const privateKeyFilePath = './src/storages/key/jwt.pem';
const publicKeyFilePath = './src/storages/key/jwt-pub.pem';

// Write the private key to a file
fs.writeFileSync(privateKeyFilePath, privateKey.privateKey);
fs.writeFileSync(publicKeyFilePath, privateKey.publicKey);

console.log(`Private key has been saved to ${privateKeyFilePath}`);
