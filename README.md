# do-not-zip

[![npm version](https://img.shields.io/npm/v/do-not-zip.svg?style=flat-square)](https://www.npmjs.com/package/do-not-zip)

Do not zip. Just store.

## What

Stick some text files into a zip file. This library is super simple and small because it just stores the files without compressing them, which is often sufficient when all you want to do is let the user download some files generated in the browser. Works on the server (Node.js) and on the client (JavaScript). Requires ES2015+.

## How

```javascript
import * as doNotZip from 'do-not-zip';

// on the server or the client:
const byteArray = doNotZip.toArray([
	// each file should have:
	// - 'path' - a string
	// - 'data' - a string, or an array of bytes or Uint8Array or Buffer or anything else that gives integers when indexed
	{ path: 'path/to/file1.txt', data: 'Hello' },
	{ path: 'another/file2.txt', data: 'World' },
	{ path: 'yet/another/file3.bin', data: [1, 2, 3, 4, 5] },
	// ...
]);
// => output will be an array of bytes

// on the server:
const buffer = doNotZip.toBuffer([ ... ]);
// => output will be a Buffer

// on the client:
const blob = doNotZip.toBlob([ ... ]);
// => output will be a Blob

// on the server or the client:
const bufferOrBlob = doNotZip.toAuto([ ... ]);
// => output will be a Buffer on the server and a Blob on the client
// (which one to return is determined by whether there is a Blob global defined)
```

## Thanks

- https://github.com/mrananyan/ZipperJS
- https://users.cs.jmu.edu/buchhofp/forensics/formats/pkzip.html
- https://stackoverflow.com/a/18639999

## License

[MIT](LICENSE)
