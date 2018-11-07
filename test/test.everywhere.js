const test = require(`zora`)
const doNotZip = require(`../`)
const { loadJzip, jzipToEntries, entriesToObject } = require(`./helper.js`)

test(`Creates a zip file that jszip can read`, async t => {
	const outputBlob = doNotZip.toAuto([
		{ path: `path/to/file1.txt`, data: `Hello` },
		{ path: `another/file2.txt`, data: `World` },
	])
	const entries = jzipToEntries(await loadJzip(outputBlob))

	const expectedPaths = [ `path/to/file1.txt`, `another/file2.txt` ]

	t.equal(entries.length, expectedPaths.length)

	const jzipMap = entriesToObject(entries)

	expectedPaths.forEach(expectedPath => t.ok(expectedPath in jzipMap))
})
