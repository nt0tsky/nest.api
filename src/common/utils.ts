import {createHmac} from "crypto";

export const encryptToSha256 = (password: string): string => {
  return createHmac('sha256', password).digest('hex')
}

