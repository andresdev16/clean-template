import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard, PassportModule } from '@nestjs/passport';

import { LocalStrategy } from 'src/Interface/Strategies/Local.strategy';
import { JwtStrategy } from 'src/Interface/Strategies/Jwt.strategy';
import { DateManager } from './Domain/Services/DateManager.service';
import { WeightManager } from 'src/Domain/Services/WeightManager.service';
import { AuthService } from 'src/Interface/Services/Auth.service';
import { RolesGuard } from 'src/Interface/Services/Roles.guard';

import { IntegrationEventPublisherImplement } from 'src/infrastructure/message/ItegrationEvent.publisher';
import { UserQueryImplement } from 'src/Infrastructure/Queries/User.query';
import { UserRepositoryImplement } from 'src/Infrastructure/Repositories/User.repository';
import { ItemQueryImplement } from './Infrastructure/Queries/Item.query';
import { ItemRepositoryImplement } from 'src/Infrastructure/Repositories/Item.repository';
import { OrdersQueryImplement } from './infrastructure/Queries/Orders.query';
import { OrderRepositoryImplement } from './Infrastructure/Repositories/Order.repository';

import { AuthController } from 'src/Interface/Auth.controller';
import { ItemController } from 'src/Interface/Item.controller';
import { OrderController } from './interface/Order.controller';

import { CreateUserCommand } from 'src/Application/Commands/Create-User.command';
import { CreateUserHandler } from 'src/Application/Commands/Create-User.handler';
import { AuthUserCommand } from 'src/Application/Commands/Auth-User.command';
import { AuthUserHandler } from 'src/Application/Commands/Auth-User.handler';
import { GetUserHandler } from 'src/Application/Queries/Get-User.handler';
import { CreateItemCommand } from './Application/Commands/Create-Item.command';
import { CreateItemHandler } from './Application/Commands/Create-Item.handler';
import { GetAllItemsHandler } from './Application/Queries/Get-Items.handler';
import { GetItemHandler } from './Application/Queries/Get-Item.handler';
import { CreateOrderCommand } from './Application/Commands/Create-Order.command';
import { CreateOrderHandler } from './application/commands/Create-Order.handler';
import { GetAllOrdersHandler } from './application/Queries/Get-Orders.handler';
import { GetOrderHandler } from './application/Queries/Get-Order.handler';
import { GetItemQuery } from './Application/Queries/Get-Item.query';
import { GetAllItemsQuery } from './Application/Queries/Get-Items.query';
import { GetAllOrdersQuery } from './application/Queries/Get-Orders.query';
import { GetOrderQuery } from './application/Queries/Get-Order.query';
import { GetUserQuery } from './Application/Queries/Get-User.query';

import { UserEntity } from './Infrastructure/Entities/User.entity';
import { ItemEntity } from './Infrastructure/Entities/Item.entity';
import { OrderEntity } from 'src/Infrastructure/Entities/Order.entity';

const Infrastructure = [
  IntegrationEventPublisherImplement,
  UserQueryImplement,
  UserRepositoryImplement,
  ItemQueryImplement,
  ItemRepositoryImplement,
  OrdersQueryImplement,
  OrderRepositoryImplement,
  UserEntity,
  ItemEntity,
  OrderEntity,
];

const Application = [
  CreateUserCommand,
  CreateUserHandler,
  AuthUserCommand,
  AuthUserHandler,
  GetUserHandler,
  CreateItemCommand,
  CreateItemHandler,
  GetAllItemsHandler,
  GetItemHandler,
  CreateOrderCommand,
  CreateOrderHandler,
  GetAllOrdersHandler,
  GetOrderHandler,
  GetItemQuery,
  GetAllItemsQuery,
  GetAllOrdersQuery,
  GetOrderQuery,
  GetUserQuery,
];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot(),
    PassportModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
        headers: {
          'x-api-key': process.env.MELONN_API_KEY
        },
      })
    }),
    JwtModule.register({
      // secretOrPrivateKey: process.env.JWT_SECRET_KEY,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {expiresIn: '3600s'}
    }),
    DDDModule
  ],
  controllers: [
    AuthController,
    ItemController,
    OrderController
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
    Logger,
    ...Infrastructure,
    ...Application,
    AuthService,
    LocalStrategy,
    JwtStrategy, 
    DateManager,
    Logger, 
    WeightManager, 
  ],
  exports: [
    AuthService
  ]
})
export class DDDModule {}