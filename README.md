# do-not-zip

[![npm version](https://img.shields.io/npm/v/do-not-zip.svg?style=flat-square)](https://www.npmjs.com/package/do-not-zip)

Do not zip. Just store.

## What

Stick some text files into a zip file. This library is super simple and small because it just stores the files without compressing them, which is often sufficient when all you want to do is let the user download some files generated in the browser. Works on the server (Node.js) and on the client (JavaScript). Requires ES2015+.

## How

```javascript
import * as doNotZip from 'do-not-zip';
const output = doNotZip.toArray([
	{ path: 'path/to/file1.txt', data: 'Hello' },
	{ path: 'another/file2.txt', data: 'World' },
	{ path: 'yet/another/file3.bin', data: [1, 2, 3, 4, 5] },
]);
// => output will be an array of bytes
// use .toBuffer on the server to generate a Buffer, and use .toBlob on the client to generate a Blob
// use .toAuto to generate a Buffer on the server or a Blob on the client
```

## Thanks

- https://github.com/mrananyan/ZipperJS
- https://users.cs.jmu.edu/buchhofp/forensics/formats/pkzip.html
- https://stackoverflow.com/a/18639999

## License

Copyright (c) 2018 Conduitry

- [MIT](LICENSE)
