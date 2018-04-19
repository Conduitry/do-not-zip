const test = require(`zora`)
const doNotZip = require(`../`)

test(`Creates a Blob in the browser`, t => {
	const outputBlob = doNotZip([
		{ path: `path/to/file1.txt`, data: `Hello` },
		{ path: `another/file2.txt`, data: `World` },
	])

	t.ok(outputBlob instanceof Blob, `output is a Blob`)
})

require(`./test.everywhere.js`)
