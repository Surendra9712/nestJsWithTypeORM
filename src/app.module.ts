import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import * as process from 'process';
import { SnapSystemModule } from '@snapSystem/snap-system.module';
import { ConfigAppModule } from './config/config-app.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from '@common/common.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EventEmitterModule } from '@nestjs/event-emitter';
import {config} from "dotenv";
import { AppModulesModule } from "@appModules/app-modules.module";
import {AuthModule} from "@appModules/auth/auth.module";
import {TrimStringsMiddleware} from "./middleware/trim-strings.middleware";
import {TimezoneMiddleware} from "./middleware/timezone.middleware";
import {UserAccountVerificationMiddleware} from "./middleware/user-account-verification.middleware";
import {OrderController} from "@appModules/order/order.controller";
import {CartController} from "@appModules/cart/cart.controller";
config()
@Module({
  imports: [
    SnapSystemModule,
    ConfigAppModule,
    DatabaseModule,
    CommonModule,
    AppModulesModule,
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'../', 'public'),
      renderPath:process.env.SERVE_STATIC_RENDER_PATH,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(TrimStringsMiddleware, TimezoneMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer.apply(UserAccountVerificationMiddleware).forRoutes(OrderController,CartController)
  }
}
