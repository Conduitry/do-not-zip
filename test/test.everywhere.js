const test = require(`zora`)
const doNotZip = require(`../`)
const { loadJzip, jzipToEntries, entriesToObject } = require(`./helper.js`)

test(`Creates a zip file that jszip can read`, async t => {
    const data = [
        { path: `path/to/file1.txt`, data: `Hello` },
        { path: `another/file2.txt`, data: `World` },
        { path: `cyrillic_text.txt`, data: `абвгде` },
        { path: `surrogateChar.txt`, data: `\uD800\uDC00` },
    ];
	const outputBlob = doNotZip.toAuto(data)
	const entries = await jzipToEntries(await loadJzip(outputBlob))

	t.equal(entries.length, data.length)

	const jzipMap = entriesToObject(entries)

    t.test(`All the files presented in the archive`, t => {
        data.forEach(({ path, data }) => {
            t.ok(path in jzipMap);
        })
    })

    t.test(`All the contents are the same`, t => {
        data.forEach(({ path, data }) => {
            t.equal(data, jzipMap[path]);
        })
    })
})
