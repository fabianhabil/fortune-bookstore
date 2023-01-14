import crypto from 'crypto';
import fs from 'fs';

// Default configuration for generating JWT secrets
const SECRET_LENGTH = 64;
const SECRET_FORMAT: BufferEncoding = 'hex';
const ENV_FILE = '.env';


function generateSecret() {
    return crypto
        .randomBytes(SECRET_LENGTH)
        .toString(SECRET_FORMAT);
}

function replaceLineWithKey(line: string): string {
    // prepare the env with the generated secrets
    const envKeys = ['JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];

    // tries to find the key
    const selectedKey = envKeys.find((key) => line.startsWith(`${key}=`));

    if (selectedKey) {
        // replace line with generated values
        return `${selectedKey}=${generateSecret()}`;
    }

    // not replacing the line
    return line;
}

function createJwtSecrets() {
    if (!fs.existsSync(ENV_FILE)) {
        console.log('Cannot find .env file');
        return;
    }

    const content = fs.readFileSync(ENV_FILE, 'utf8');
    const lines = content.split('\n').map((line) => replaceLineWithKey(line));

    fs.writeFileSync(ENV_FILE, lines.join('\n'), 'utf8');
}

createJwtSecrets();