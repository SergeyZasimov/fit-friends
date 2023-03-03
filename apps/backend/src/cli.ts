import { NestFactory } from '@nestjs/core';
import { CliModule } from './app/cli/cli.module';
import { CliService } from './app/cli/cli.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CliModule);
  console.log('Start filling the database');
  await app.select(CliModule).get(CliService, { strict: true }).execution();
  await app.close();
  console.log('Database was filled');
}

bootstrap();
