import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const frontendOrigin =
    process.env.FRONTEND_ORIGIN ?? 'http://192.168.0.50:5173';
  const corsOptions: CorsOptions = {
    origin: [frontendOrigin],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  };
  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
