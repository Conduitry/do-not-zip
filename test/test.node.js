const test = require(`zora`)
const doNotZip = require(`../`)

test(`Creates a Buffer in node`, t => {
	const outputBlob = doNotZip.toAuto([
		{ path: `path/to/file1.txt`, data: `Hello` },
		{ path: `another/file2.txt`, data: `World` },
	])

	t.ok(outputBlob instanceof Buffer, `output is a Buffer`)
})

require(`./test.everywhere.js`)
