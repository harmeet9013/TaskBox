import ShortUniqueId from "short-unique-id";
//
import { AES_METHOD, IV_LENGTH, SECRET_KEY } from "@/config";

export const encryptData = (data) => {
    if (process.versions.openssl <= "1.0.1f") {
        throw new Error("OpenSSL Version too old, vulnerability to Heartbleed");
    }

    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(AES_METHOD, Buffer.from(SECRET_KEY), iv);
    let encrypted = cipher.update(data);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const decryptData = (data) => {
    let textParts = data.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv(
        AES_METHOD,
        Buffer.from(SECRET_KEY),
        iv
    );
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
};

export const uid = new ShortUniqueId({ length: 5 });
