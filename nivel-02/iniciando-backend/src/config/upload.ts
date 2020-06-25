import path from 'path';
import multer from 'multer';
import { uuid } from 'uuidv4';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileUuid = uuid();
      const filename = `${fileUuid}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
