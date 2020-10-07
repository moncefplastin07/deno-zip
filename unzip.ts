import { exists, join, log } from "./deps.ts";
import { downloadFileToTemp } from "./fileDownloader.ts";

export const unZipFromFile = async (
  filePath: string,
  destinationPath: string | null = "./",
  options: any = {},
): Promise<string | false> => {
  // check if the zip file is exist
  if (!await exists(filePath)) {
    log.error("this file does not found");
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

export const unZipFromURL = async (
  fileURL: string,
  destinationPath: string | null = "./",
  options: any = {},
): Promise<string | false> => {
  // download the file to temp
  const downloadedFilePath = await downloadFileToTemp(fileURL);

  // unzip the temp file
  const unZippingProcess = await unZipFromFile(
    downloadedFilePath,
    destinationPath,
    options,
  );

  // remove the temp file
  await Deno.remove(downloadedFilePath);

  // return the unzipped file path
  return unZippingProcess;
};
