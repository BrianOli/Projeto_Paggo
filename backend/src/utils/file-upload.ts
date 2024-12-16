import { diskStorage } from 'multer';
import { extname } from 'path';

export const fileUploadOptions = {
  storage: diskStorage({
    destination: './uploads', 
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + extname(file.originalname);
      callback(null, file.fieldname + '-' + uniqueSuffix);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
};
