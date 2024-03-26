import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import 'dotenv/config';
import './helpers/bigint';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const document = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
