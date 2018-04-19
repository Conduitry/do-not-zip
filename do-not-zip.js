// Construct Buffer or Blob of a .zip file in store mode (i.e., no compression)

// thanks to:
// https://github.com/mrananyan/ZipperJS
// https://users.cs.jmu.edu/buchhofp/forensics/formats/pkzip.html
// https://stackoverflow.com/a/18639999

const crcTable = [];
for (let n = 0; n < 256; n++) {
	let c = n;
	for (let k = 0; k < 8; k++) {
		c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
	}
	crcTable[n] = c;
}

const strCRC = str => {
	let crc = -1;
	for (let i = 0; i < str.length; i++) {
		crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
	}
	return crc ^ -1;
};

const intToBytes = (int, length) => {
	const out = [];
	while (length--) {
		out.push(int & 0xFF);
		int >>>= 8;
	}
	return out;
};

const strToBytes = str => [...str].map(char => char.charCodeAt(0));

export default files => {
	const fileData = [];
	const centralDirectory = [];
	for (const { path, data } of files) {
		const commonHeader = [0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, ...intToBytes(strCRC(data), 4), ...intToBytes(data.length, 4), ...intToBytes(data.length, 4), ...intToBytes(path.length, 2), 0x00, 0x00];
		centralDirectory.push(0x50, 0x4B, 0x01, 0x02, 0x14, 0x00, ...commonHeader, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, ...intToBytes(fileData.length, 4), ...strToBytes(path));
		fileData.push(0x50, 0x4B, 0x03, 0x04, ...commonHeader, ...strToBytes(path), ...strToBytes(data));
	}
	const bytes = [...fileData, ...centralDirectory, 0x50, 0x4B, 0x05, 0x06, 0x00, 0x00, 0x00, 0x00, ...intToBytes(files.length, 2), ...intToBytes(files.length, 2), ...intToBytes(centralDirectory.length, 4), ...intToBytes(fileData.length, 4), 0x00, 0x00];
	if (typeof Buffer !== 'undefined') {
		return Buffer.from(bytes);
	}
	if (typeof Blob !== 'undefined' && typeof Uint8Array !== 'undefined') {
		return new Blob([Uint8Array.from(bytes)], { type: 'application/zip' });
	}
};
