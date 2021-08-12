import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DDDModule } from './ddd.module';

@Module({
  imports: [
    DDDModule
  ],

  controllers: [
    AppController
  ],

  providers: [
    AppService
  ],

  exports: [
  ]
})
export class AppModule {}
