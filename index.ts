import * as AWS from 'aws-sdk';
import { promises as fs } from 'fs';

const textract = new AWS.Textract();

const main = async () => {
  try {
    // read the image
    const buf = await fs.readFile('./menu1.jpg');
    // send to aws
    const res = await textract.detectDocumentText({ Document: { Bytes: buf } }).promise();
    // parse the result
    console.log(res.Blocks.filter(i => i.BlockType === 'LINE').map(i => i.Text).join('\n'));
  } catch (err) {
    console.error(err);
  }
};

main();