export const getFileNameFromPath = (filePath: string)=>{
    return filePath.split('/').at(-1)?.split('.').slice(0,-1).join('.') || ""
}