import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

var admin = require("firebase-admin");
var serviceAccount = require("../src/marketuv-cf899-firebase-adminsdk-9sjo3-78635ce411.json");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://marketuv-cf899-default-rtdb.firebaseio.com"
  });
}
bootstrap();
