import { join, exists } from "./deps.ts";
export const unZipFromFile = async (filePath: string, destinationPath: string = './', options: any = {}): Promise<string | false>=> {

    // check if the zip file is exist
    if (!await exists(filePath)) {
        return false
    }
    //get the file name from filePath
    const fullFileName = filePath.split('/')
    // the file name with aut extension
    const FileNameWithOutExt = fullFileName[fullFileName.length - 1].split('.')[0]
    // get the extract file and add FileNameWithOutExt whene options.includeFileName is true
    const fullDestinationPath = options.includeFileName ? join(destinationPath, FileNameWithOutExt) : destinationPath

    // return the unzipped file path or false whene the unzipping Process failed
    return await unzipProcess(filePath, destinationPath) ? fullDestinationPath : false

}
const unzipProcess = async (zipSourcePath: string, destinationPath: string ): Promise<boolean> =>{
    const unzipCommandProcess = Deno.run({
        cmd: Deno.build.os === 'windows' ? ["PowerShell", "Expand-Archive", "-Path", zipSourcePath, "-DestinationPath", destinationPath] : ["unzip", zipSourcePath, "-d", `~/${destinationPath}`],
        stdout: "piped",
        stderr: "piped"
    })
    
    return (await unzipCommandProcess.status()).success
    
}

