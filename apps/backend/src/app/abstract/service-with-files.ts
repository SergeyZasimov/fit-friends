import { ConfigService } from '@nestjs/config';
import nanoid from 'nanoid';
import { constants } from 'node:fs';
import { access, mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

export abstract class ServiceWithFiles {
  protected host: string;
  protected port: number;
  protected staticFolder: string;
  protected uploadFolder: string;

  constructor(protected readonly config: ConfigService) {
    this.host = config.get<string>('app.host');
    this.port = config.get<number>('app.port');
    this.staticFolder = this.config.get<string>('static.folder');
    this.uploadFolder = this.config.get<string>('static.upload');
  }

  protected setFileUrl(file: Express.Multer.File) {
    return new URL(
      `http://${this.host}:${this.port}/${this.uploadFolder}/${file.fieldname}/${file.filename}`
    ).href;
  }

  protected setFilename(file: Express.Multer.File): Express.Multer.File {
    const filename = nanoid();
    const ext = path.extname(file.originalname);
    file.filename = `${filename}${ext}`;
    return file;
  }

  protected async checkFolderExist(file: Express.Multer.File): Promise<string> {
    const folderPath = path.resolve(
      this.staticFolder,
      this.uploadFolder,
      file.fieldname
    );
    await access(folderPath, constants.F_OK).catch(async () => {
      await mkdir(folderPath, { recursive: true });
    });
    return folderPath;
  }

  protected async writeUserFile(file: Express.Multer.File): Promise<void> {
    const folderPath = await this.checkFolderExist(file);
    const filePath = path.join(folderPath, file.filename);
    await writeFile(filePath, file.buffer);
  }

  protected async deleteUserFile(url: string): Promise<void> {
    const filePath = path.resolve(
      this.staticFolder,
      ...url.split('/').slice(-3)
    );
    await unlink(filePath);
  }
}
