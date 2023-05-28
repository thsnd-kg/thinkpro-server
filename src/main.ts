import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { configSwagger } from './config/swagger.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  configSwagger(app);

  // pass reflector to Nest.js global guard
  // app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // dont allow body contain attribute didn't define in dto
    }),
  );
  app.use(cookieParser());
  app.enableCors();

  const port = configService.get('app.port');

  await app.listen(port);
}

bootstrap()
  .then(() => {
    console.log(`Application is running on port ${process.env.PORT}`);
  })
  .catch((error) => {
    console.log(error);
  });
