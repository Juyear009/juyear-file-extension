import { writeFileSync, readFileSync } from "fs";
import { Buffer } from "buffer";

export const fileService = {
    save(filePath: string, content: string): boolean {
        const header = Buffer.from([0x4A, 0x59, 0x01]);
        const body = Buffer.from(content,'utf-8');
        const finalData = Buffer.concat([header,body]);

        writeFileSync(filePath,finalData);
        return true;
    },
    read(filePath:string):string {
        const fileBuffer = readFileSync(filePath);
        
        if (fileBuffer[0] != 0x4A || fileBuffer[1] !== 0x59) {
            throw new Error('올바른 확장자 형식이 아닙니다.');
        }

        const version = fileBuffer[2];
        console.log(version);

        const body = fileBuffer.subarray(3).toString('utf-8');

        return body;
    }
}