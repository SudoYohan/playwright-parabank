import fs from 'fs';
import path from 'path';

export type SavedCredentials = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  ssn: string;
  username: string;
  password: string;
  createdAt: string;
};

const storeFile = path.resolve(process.cwd(), 'test-data', 'registered-user.json');

function ensureStoreDir() {
  fs.mkdirSync(path.dirname(storeFile), { recursive: true });
}

export function saveCredentials(credentials: SavedCredentials) {
  ensureStoreDir();
  fs.writeFileSync(storeFile, JSON.stringify(credentials, null, 2), 'utf8');
}

export function loadCredentials(): SavedCredentials {
  if (!fs.existsSync(storeFile)) {
    throw new Error(`Credentials file not found: ${storeFile}`);
  }
  const raw = fs.readFileSync(storeFile, 'utf8');
  return JSON.parse(raw) as SavedCredentials;
}
