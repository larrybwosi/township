import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { apiEnv } from '@repo/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(apiEnv.PORT);
  console.log(`Gateway is running on: ${await app.getUrl()}`);
}
bootstrap();
