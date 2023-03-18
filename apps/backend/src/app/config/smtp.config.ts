import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';
import path from 'node:path';

export function getSmtpConfig(): MailerAsyncOptions {
  return {
    useFactory: async (
      configService: ConfigService
    ): Promise<MailerOptions> => ({
      transport: {
        host: configService.get<string>('smtp.host'),
        port: configService.get<number>('smtp.port'),
        secure: false,
      },
      defaults: {
        from: configService.get<string>('smtp.from'),
      },
      template: {
        dir: path.resolve(__dirname, 'assets'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    inject: [ConfigService],
  };
}
