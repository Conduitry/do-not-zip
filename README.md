# do-not-zip

Do not zip. Just store.

## What

Stick some text files into a zip file. Works on the server (Node.js) and on the client (JavaScript). Requires ES2015+.

## Usage

```javascript
import doNotZip from '.../do-not-zip.js';
const output = doNotZip([
	{ path: 'path/to/file1.txt', data: 'Hello' },
	{ path: 'another/file2.txt', data: 'World' },
]);
// => output will be a Buffer on the server and a Blob on the client
```

## Thanks

- https://github.com/mrananyan/ZipperJS
- https://users.cs.jmu.edu/buchhofp/forensics/formats/pkzip.html
- https://stackoverflow.com/a/18639999

## License

Copyright (c) 2018 Conduitry

- [MIT](LICENSE)
