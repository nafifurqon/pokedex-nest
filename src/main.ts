import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Pokedex API')
    .setDescription('API for manage Pokemon data and catch pokemon')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Please enter token in following format: <JWT>`,
        name: 'Authorization',
        type: 'http',
        in: 'Header',
      },
      'access_token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document);

  await app.listen(3000);
}
bootstrap();
