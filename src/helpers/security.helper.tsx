export const base64EncodeString = (value: string) => {
    let buff: Buffer = new Buffer(value);
    let base64data: string = buff.toString("base64");
  
    return base64data;
  };