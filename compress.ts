import { exists, join } from "./deps.ts";
interface CompressOptions {
  overwrite?: boolean;
}
const compressProcess = async (
  files: string | string[],
  archiveName: string = "./archive.zip",
  options?: CompressOptions,
): Promise<boolean> => {
  if (await exists(archiveName) && !(options?.overwrite)) {
    throw `The archive file ${
      join(Deno.cwd(), archiveName)
    }.zip already exists, Use the {overwrite: true} option to overwrite the existing archive file`;
  }
  const filesList = typeof files === "string" ? files : files.join(", ");
  const compressCommandProcess = Deno.run({
    cmd: Deno.build.os === "windows"
      ? [
        "PowerShell",
        "Compress-Archive",
        "-Path",
        filesList,
        "-DestinationPath",
        archiveName,
        options?.overwrite ? "-Force" : "",
      ]
      : ["zip", archiveName, filesList],
    stdout: "piped",
    stderr: "piped",
  });
  return (await compressCommandProcess.status()).success;
};

export const compress = async (
  files: string | string[],
  archiveName: string = "./archive.zip",
  options?: CompressOptions,
): Promise<boolean> => {
  return await compressProcess(files, archiveName, options);
};
