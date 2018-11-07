'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const table = [];
for (let n = 0; n < 256; n++) {
	let c = n;
	for (let k = 0; k < 8; k++) {
		c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
	}
	table[n] = c;
}

var crc32 = bytes => {
	let sum = -1;
	for (const byte of bytes) {
		sum = (sum >>> 8) ^ table[(sum ^ byte) & 0xFF];
	}
	return sum ^ -1;
};

const int = (n, length) => {
	const out = [];
	while (length--) {
		out.push(n & 0xFF);
		n >>>= 8;
	}
	return out;
};

const toBytes = data => typeof data === 'string' ? [...data].map(char => char.charCodeAt(0)) : data;

var toArray = files => {
	let fileData = [];
	const centralDirectory = [];
	for (const { path, data } of files) {
		const dataBytes = toBytes(data);
		const pathBytes = toBytes(path);
		const commonHeader = [0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, ...int(crc32(dataBytes), 4), ...int(dataBytes.length, 4), ...int(dataBytes.length, 4), ...int(pathBytes.length, 2), 0x00, 0x00];
		centralDirectory.push(0x50, 0x4B, 0x01, 0x02, 0x14, 0x00, ...commonHeader, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, ...int(fileData.length, 4), ...pathBytes);
		fileData = [...fileData, 0x50, 0x4B, 0x03, 0x04, ...commonHeader, ...pathBytes, ...dataBytes];
	}
	return [...fileData, ...centralDirectory, 0x50, 0x4B, 0x05, 0x06, 0x00, 0x00, 0x00, 0x00, ...int(files.length, 2), ...int(files.length, 2), ...int(centralDirectory.length, 4), ...int(fileData.length, 4), 0x00, 0x00];
};

var toBlob = files => new Blob([Uint8Array.from(toArray(files))], { type: 'application/zip' });

var toBuffer = files => Buffer.from(toArray(files));

var toAuto = files => (typeof Blob === 'undefined' ? toBuffer : toBlob)(files);

exports.toArray = toArray;
exports.toAuto = toAuto;
exports.toBlob = toBlob;
exports.toBuffer = toBuffer;
//# sourceMappingURL=index.cjs.js.map
