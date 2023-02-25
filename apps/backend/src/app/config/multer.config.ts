import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModuleAsyncOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import nanoid from 'nanoid';
import { constants } from 'node:fs';
import { access, mkdir } from 'node:fs/promises';
import path from 'node:path';

export function getMulterConfig(): MulterModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const staticFolder = configService.get<string>('static.folder');
      const uploadFolder = configService.get<string>('multer.storage');

      return {
        storage: diskStorage({
          destination: async (_req, file, cb) => {
            const folderPath = path.resolve(
              staticFolder,
              uploadFolder,
              file.fieldname
            );
            await access(folderPath, constants.F_OK).catch(async () => {
              await mkdir(folderPath, { recursive: true });
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
