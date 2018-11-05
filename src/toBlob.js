import toArray from './toArray.js';

export default files => new Blob([Uint8Array.from(toArray(files))], { type: 'application/zip' });
