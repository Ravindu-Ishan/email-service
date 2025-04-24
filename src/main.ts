import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../proto/email.proto'),
      url: 'localhost:50053',
      package: 'email', // <- from your .proto
    },
  });
  
  await app.listen(); // 
}
bootstrap();
