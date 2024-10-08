import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ExceptionHandler } from 'src/exceptions/handler';
import { ConfigService } from '@nestjs/config';
import { ValidationException } from 'src/exceptions/validation.exception';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    exposedHeaders: ['Authorization', 'Access-Token'],
  });
  app.use(helmet({crossOriginResourcePolicy:{policy:'cross-origin'}}));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: false,
      // manipulate the validation error messages
      exceptionFactory: (errors: ValidationError[] = []) => {
        return new ValidationException(handleValidationError(errors));
      },
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const { httpAdapter } = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new ExceptionHandler(httpAdapter, configService));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Market place api')
    .setDescription('Market place api')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/documentation', app, swaggerDocument);

  await app.listen(3000);
}

bootstrap();

function handleValidationError(errors: ValidationError[] = []) {
  return errors.reduce((acc: {}, error: ValidationError) => {
    if (error.children.length === 0) {
      acc[error.property] = Object.values(error.constraints);
    } else {
      acc[error.property] = handleValidationError(error.children);
    }
    return acc;
  }, {});
}
