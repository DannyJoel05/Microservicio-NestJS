import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const looger = new Logger('MS-PRODUCT-MAIN');
  //const app = await NestFactory.create(AppModule)
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.port
      }
    }
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  //await app.listen(envs.port);
  await app.listen();
  looger.log(`MS-PRODUCT-MAI: en el puerto ${envs.port}`)
}
bootstrap();
