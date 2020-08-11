export interface FileItem {
  path: string | number[] | Uint8Array | Buffer;
  data: string | number[] | Uint8Array | Buffer;
}

export function toBlob(files: FileItem[]): Blob;

export function toBuffer(files: FileItem[]): Buffer;

export function toArray(files: FileItem[]): number[];

export function toAuto(files: FileItem[]): Blob | Buffer;
