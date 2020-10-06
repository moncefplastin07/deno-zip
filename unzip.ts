import { exists, join } from "./deps.ts";
export const unZipFromFile = async (
  filePath: string,
  destinationPath: string | null = "./",
  options: any = {},
): Promise<string | false> => {
  // check if the zip file is exist
  if (!await exists(filePath)) {
    return false;
  }
  // check destinationPath is not null and set './' as destinationPath
  if (!destinationPath) {
    destinationPath = "./";
  }
  //get the file name from filePath
  const fullFileName = filePath.split("/");
  // the file name with aut extension
  const fileNameWithOutExt =
    fullFileName[fullFileName.length - 1].split(".")[0];
  // get the extract file and add fileNameWithOutExt whene options.includeFileName is true
  const fullDestinationPath = options.includeFileName
    ? join(destinationPath, fileNameWithOutExt)
    : destinationPath;

  // return the unzipped file path or false whene the unzipping Process failed
  return await unzipProcess(filePath, fullDestinationPath)
    ? fullDestinationPath
    : false;
};
const unzipProcess = async (
  zipSourcePath: string,
  destinationPath: string,
): Promise<boolean> => {
  const unzipCommandProcess = Deno.run({
    cmd: Deno.build.os === "windows"
      ? [
        "PowerShell",
        "Expand-Archive",
        "-Path",
        zipSourcePath,
        "-DestinationPath",
        destinationPath,
      ]
      : ["unzip", zipSourcePath, "-d", destinationPath],
    stdout: "piped",
    stderr: "piped",
  });

  return (await unzipCommandProcess.status()).success;
};
