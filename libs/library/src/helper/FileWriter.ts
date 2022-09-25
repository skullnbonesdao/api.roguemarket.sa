import * as fs from "fs";

export async function writeFile(data: any, path: string = "./out.json") {
  await fs.writeFile(path, JSON.stringify(data, undefined, 4), function (err) {
    if (err) throw err;
    console.log("File Written!");
  });
  return 0;
}
