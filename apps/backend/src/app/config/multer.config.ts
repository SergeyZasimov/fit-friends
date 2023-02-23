import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModuleAsyncOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import nanoid from 'nanoid';
import { access, constants } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

export function getMulterConfig(): MulterModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const uploadFolder = configService.get<string>('multer.storage');

      return {
        storage: diskStorage({
          destination: (_req, file, cb) => {
            const folderPath = path.join(uploadFolder, file.fieldname);
            access(folderPath, constants.F_OK, () => {
              mkdir(folderPath, { recursive: true });
            });
            cb(null, folderPath);
          },
          filename: (_req, file, cb) => {
            const filename = nanoid();
            const ext = path.extname(file.originalname);
            cb(null, `${filename}${ext}`);
          },
        }),
      };
    },
    inject: [ConfigService],
  };
}
