const JSZip = require(`./jszip.js`)

module.exports = {
	loadJzip(data) {
		return new JSZip().loadAsync(data)
	},
	jzipToEntries(jzip) {
		const ary = []
		jzip.forEach((path, file) => ary.push(file.async("string").then((str) => ({ path, str }))))
		return Promise.all(ary)
	},
	entriesToObject(entries) {
		return entries.reduce((acc, { path, str }) => {
			acc[path] = str
			return acc
		}, Object.create(null))
	},
}
