import { Module } from '@nestjs/common';
import { UserModule } from './Users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksModule } from './Tracks/tracks.module';
import { ArtistsModule } from './Artists/artists.module';
import { AlbumModule } from './Albums/album.module';
import { FavoritesModule } from './Favorites/TrackFavorites/favorites.module';
import { AuthModule } from './authenticationAndAuthorization/auth.module';
import { LoggerServiceModule } from './Logger/loggerService.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './ErrorHandling/exceptionFilter.service';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    UserModule,
    TracksModule,
    ArtistsModule,
    AlbumModule,
    LoggerServiceModule,
    FavoritesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST') || 'db',
        port: 5432,
        url: configService.get('DATABASE_URL'),
        password: configService.get('DB_PASSWORD'),
        username: configService.get('DB_USERNAME'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: ['dist/**/*.entity.js'],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
