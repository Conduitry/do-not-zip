const table = [];
for (let n = 0; n < 256; n++) {
	let c = n;
	for (let k = 0; k < 8; k++) {
		c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
	}
	table[n] = c;
}

export default bytes => {
	let sum = -1;
	for (const byte of bytes) {
		sum = (sum >>> 8) ^ table[(sum ^ byte) & 0xFF];
	}
	return sum ^ -1;
};
