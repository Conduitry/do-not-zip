const JSZip = require(`./jszip.js`)

module.exports = {
	loadJzip(data) {
		return new JSZip().loadAsync(data)
	},
	jzipToEntries(jzip) {
		const ary = []
		jzip.forEach((path, file) => ary.push({ path, file }))
		return ary
	},
	entriesToObject(entries) {
		return entries.reduce((acc, { path, file }) => {
			acc[path] = file
			return acc
		}, Object.create(null))
	},
}
