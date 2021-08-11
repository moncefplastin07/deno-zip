# Deno Zip archive
Streaming cross-platform unzip tool written for Deno 🦕. 
### the module require permision below
- **--allow-run**: for running unzipping command in command prompt
- **--allow-read**: check the existence of the file before starting the decompression process.
- **--unstable**: Since this tool uses version ``0.85.0`` of the standard Deno modules that has some unstable features

### import the module in your deno app
```js
import { unZipFromFile, unZipFromURL } from 'https://deno.land/x/zip@v1.1.1/mod.ts'
```
or from ``nest.land`` packages
```js
import { unZipFromFile, unZipFromURL } from 'https://x.nest.land/zip@v1.1.1/mod.ts'
```
#### Usage:
```js
unZipFromFile([filePath]:string, [destinationPath]:string = './', [options]:{}): Promise<string | false>
```

**``arguments``**
- **filePath**: string of zip file path.
- **destinationPath**: (null|string) null or string of destination path (Where do you want the unzipped files to be) as default is './' (current working directory (CWD))
- **options**: object of unzipping options

**``return``**
Promise<string | false> The destination path or false if the extraction process fails.
### Examples:
```js
// unZip From File
console.log(await unZipFromFile('myfile.zip'))                        //=> ./
console.log(await unZipFromFile('myfile.zip', 'new-dir'))             //=> new-dir
console.log(await unZipFromFile('myfile.zip', null, {
    includeFileName: true
}))                                                             //=> myfile
console.log(await unZipFromFile('myfile.zip', 'new-dir', {
    includeFileName: true
}))                                                             //=> new-dir\myfile
// 
console.log(await unZipFromURL('https://github.com/moncefplastin07/deno-zip/archive/main.zip'))                                               //=> ./
```
### NEW features
**``unZipFromURL``:** now You can download the zip file and unzipping them directly (You can use the other arguments , such as unZip From File like ``destinationPath`` and ``options``)
## all thenks to [``@Return-Errors``](https://github.com/Return-Errors)
## Contribute with us from [``Here``](https://github.com/moncefplastin07/deno-zip)