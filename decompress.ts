import { exists, join } from "./deps.ts";
import { getFileNameFromPath } from "./utils.ts";
export const decompress = async (
  filePath: string,
  destinationPath: string | null = "./",
  options: any = {},
): Promise<string | false> => {
  // check if the zip file is exist
  if (!await exists(filePath)) {
    throw "this file does not found";
  }
  // check destinationPath is not null and set './' as destinationPath
  if (!destinationPath) {
    destinationPath = "./";
  }

  // the file name with aut extension
  const fileNameWithOutExt = getFileNameFromPath(filePath)
  // get the extract file and add fileNameWithOutExt whene options.includeFileName is true
  const fullDestinationPath = options.includeFileName
    ? join(destinationPath, fileNameWithOutExt)
    : destinationPath;

  // return the unzipped file path or false whene the unzipping Process failed
  return await decompressProcess(filePath, fullDestinationPath)
    ? fullDestinationPath
    : false;
};
const decompressProcess = async (
  zipSourcePath: string,
  destinationPath: string,
): Promise<boolean> => {
  const unzipCommandProcess = Deno.run({
    cmd: Deno.build.os === "windows"
      ? [
        "PowerShell",
        "Expand-Archive",
        "-Path",
        `"${zipSourcePath}"`,
        "-DestinationPath",
        `"${destinationPath}"`,
      ]
      : ["unzip", zipSourcePath, "-d", destinationPath],
  });
  const processStatus = (await unzipCommandProcess.status()).success
  Deno.close(unzipCommandProcess.rid)
  return processStatus;
};
