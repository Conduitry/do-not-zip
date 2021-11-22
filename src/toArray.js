import crc32 from './crc32.js';

const int = (n, length) => {
	const out = [];
	while (length--) {
		out.push(n & 0xFF);
		n >>>= 8;
	}
	return out;
};

const toBytes = data => typeof data === 'string' ? new TextEncoder().encode(data) : data;

export default files => {
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
