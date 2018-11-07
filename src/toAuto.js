import toBlob from './toBlob.js';
import toBuffer from './toBuffer.js';
export default files => (typeof Blob === 'undefined' ? toBuffer : toBlob)(files);
