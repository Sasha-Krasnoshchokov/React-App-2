import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(parseInt(process.env.PORT) || 4000);

  const appUrl = await app.getUrl();

  console.log('\n');
  console.log('server running \n');
  Logger.log(`app is running on ${appUrl}`, 'NestApplication');
}
bootstrap();
