# Deno Zip archive

Streaming cross-platform zip tool written for Deno 🦕.

### the module require permision below

- **--allow-run**: for running unzipping command in command prompt
- **--allow-read**: check the existence of the file before starting the
  decompression process.

### import the module in your deno app

```js
import {
  compress,
  decompress
} from "https://deno.land/x/zip@v1.2.5/mod.ts";
```


#### Usage:
### Compressing
Compress files and folders to zip file with ``compress`` method
addin: v1.2.0
```js
interface CompressOptions {
  overwrite?: boolean;
}
compress(files:string | string[],
  archiveName: string = "./archive.zip",
  options?: CompressOptions):Promise<boolean>
decompress(filePath:string, [destinationPath]:string = './', options:{}): Promise<string | false>
```
**`arguments`**

- **files**: (string) of one file or more or array of folders and files paths
- **archiveName**: (string) string of name and destination path of zip file (Where
  do you want the get compressed zip file) by default is './archive.zip' (current working
  directory (CWD))
- **options**: object of compressing options
-   **overwrite**: boolean
- 
### Examples:

```js
// unZip From File
console.log(await compress("./myfiles")); //=> boolean
console.log(await compress("./mypicter.png", "new-dir/mypicter.zip")); //=> boolean
console.log(await compress(["./mypicters", "./textpalne.txt"], "compressed.zip", {overwrite:true})); //=> boolean

```
### Decompressing

```js
decompress(filePath:string, destinationPath:string = './', options:{}): Promise<string | false>
```

**`arguments`**

- **filePath**: string of zip file path.
- **destinationPath**: (null|string) null or string of destination path (Where
  do you want the unzipped files to be) as default is './' (current working
  directory (CWD))
- **options**: object of unzipping options

**`return`** Promise<string | false> The destination path or false if the
extraction process fails.

### Examples:

```js
// unZip From File
console.log(await decompress("myfile.zip")); //=> ./
console.log(await decompress("myfile.zip", "new-dir")); //=> new-dir
console.log(
  await decompress("myfile.zip", null, {
    includeFileName: true,
  }),
); //=> myfile
console.log(
  await decompress("myfile.zip", "new-dir", {
    includeFileName: true,
  }),
); //=> new-dir\myfile

```

## Contribute with us from [`Here`](https://github.com/moncefplastin07/deno-zip)
