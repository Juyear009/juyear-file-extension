import { writeFileSync, readFileSync } from 'fs'
import { Buffer } from 'buffer'

export const fileService = {
  save(filePath: string, content: string): boolean {
    const header = Buffer.from([0x00, 0xff, 0x4a, 0x59, 0x01])
    const encodeBody = Buffer.from(content, 'utf-8').toString('base64')
    const finalData = Buffer.concat([header, Buffer.from(encodeBody)])

    writeFileSync(filePath, finalData)
    return true
  },
  read(filePath: string): string {
    const fileBuffer = readFileSync(filePath)

    if (fileBuffer[2] != 0x4a || fileBuffer[3] !== 0x59) {
      throw new Error('올바른 확장자 형식이 아닙니다.')
    }

    const version = fileBuffer[4]
    console.log(version)

    const encodedBody = fileBuffer.subarray(5).toString()
    const decodedBody = Buffer.from(encodedBody, 'base64').toString('utf-8')

    return decodedBody
  }
}
