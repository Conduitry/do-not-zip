# v1.0.0

- Rename current (default and only) export to a named `toAuto` export, which creates a `Blob` or `Buffer` as appropriate
- Add `toArray`, `toBlob`, and `toBuffer` exports to manually specify the output format
- Git tag is now the built version, for easier direct installation without the npm registry

# v0.1.3

- Fix issue when trying to add large files

# v0.1.2

- Support specifying files as arrays of bytes

# v0.1.1

- Prefer outputting as a Blob over a Buffer, as it's possible that Buffer will have been polyfilled in the browser

# v0.1.0

- Initial release
