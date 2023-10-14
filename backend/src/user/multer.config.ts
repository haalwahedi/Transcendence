import { diskStorage } from 'multer';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads', // Specify the destination folder for file uploads
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, file.fieldname + '-' + uniqueSuffix);
    },
  }),
};
