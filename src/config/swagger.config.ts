import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const configSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('NestJS Practice')
    .setDescription('NestJS Practice')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        description: '[just text field] Please enter token in following format: Bearer <JWT>',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
};
