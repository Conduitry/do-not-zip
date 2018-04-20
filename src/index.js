// do-not-zip.js
// Construct a Buffer or a Blob of a .zip file with no compression, on the server or in the browser

const crcTable = [];
for (let n = 0; n < 256; n++) {
	let c = n;
	for (let k = 0; k < 8; k++) {
		c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
	}
	crcTable[n] = c;
}

const crc32 = bytes => {
	let sum = -1;
	for (const byte of bytes) {
		sum = (sum >>> 8) ^ crcTable[(sum ^ byte) & 0xFF];
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

export default files => {
	const fileData = [];
	const centralDirectory = [];
	for (const { path, data } of files) {
		const dataBytes = toBytes(data);
		const pathBytes = toBytes(path);
		const commonHeader = [0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, ...int(crc32(dataBytes), 4), ...int(dataBytes.length, 4), ...int(dataBytes.length, 4), ...int(pathBytes.length, 2), 0x00, 0x00];
		centralDirectory.push(0x50, 0x4B, 0x01, 0x02, 0x14, 0x00, ...commonHeader, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, ...int(fileData.length, 4), ...pathBytes);
		fileData.push(0x50, 0x4B, 0x03, 0x04, ...commonHeader, ...pathBytes, ...dataBytes);
	}
	const bytes = [...fileData, ...centralDirectory, 0x50, 0x4B, 0x05, 0x06, 0x00, 0x00, 0x00, 0x00, ...int(files.length, 2), ...int(files.length, 2), ...int(centralDirectory.length, 4), ...int(fileData.length, 4), 0x00, 0x00];
	if (typeof Blob !== 'undefined' && typeof Uint8Array !== 'undefined') {
		return new Blob([Uint8Array.from(bytes)], { type: 'application/zip' });
	}
	if (typeof Buffer !== 'undefined') {
		return Buffer.from(bytes);
	}
};
