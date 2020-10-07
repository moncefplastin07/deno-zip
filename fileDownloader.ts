import { join } from "./deps.ts";
import os from "https://deno.land/x/dos@v0.1.0/mod.ts";

export const downloadFileToTemp = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();

  // We convert the blob into a typed array
  // so we can use it to write the data into the file
  const arrayBufferFromBlobResponse = await blob.arrayBuffer();
  const uint8ArrayEncodeFileData = new Uint8Array(arrayBufferFromBlobResponse);

  const tempFilePath = join(os.tempDir(), "file.zip");

  // We then create a new file and write into it
  const file = await Deno.create(tempFilePath);
  await Deno.writeAll(file, uint8ArrayEncodeFileData);

  // We can finally close the file
  Deno.close(file.rid);

  return tempFilePath;
};
