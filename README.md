# Deno Zip archive
zip file extraction for deno 🦕
### the module require permision below
- **--allow-run**
- **--allow-env**
- **--unstable**
### import the module in your deno app
```js
import { unZipFromFile } from 'https://deno.land/x/zip@v1.0.0/mod.ts'
```
or from ``nest.land`` packages
```js
import { unZipFromFile } from 'https://x.nest.land/zip@v1.0.0/mod.ts'
```
#### Usage:
```js
unZipFromFile([filePath]:string, [destinationPath]:string = './', [options]:{})
```
``arguments``
- **filePath**: string of zip file path.
- **destinationPath**: (null|string) null or string of destination path (Where do you want the unzipped files to be) as default is './' (current working directory (CWD))
- **options**: object of unzipping options

``return``
(string|false) The destination path or false if the extraction process fails.
### Examples:
```js
// unZip From File
console.log(unZipFromFile('myfile.zip'))                        //=> ./
console.log(unZipFromFile('myfile.zip', 'new-dir'))             //=> new-dir
console.log(await unZipFromFile('myfile.zip', null, {
    includeFileName: true
}))                                                             //=> myfile
console.log(unZipFromFile('myfile.zip', 'new-dir', {
    includeFileName: true
}))                                                             //=> new-dir\myfile
```
## Contribute with us from [``Here``](https://github.com/moncefplastin07/deno-zip)