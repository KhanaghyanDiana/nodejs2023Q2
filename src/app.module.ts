import { Module } from '@nestjs/common';
import { UserModule } from './Users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksModule } from './Tracks/tracks.module';
import { ArtistsModule } from './Artists/artists.module';
import { AlbumModule } from './Albums/album.module';
import { FavoritesModule } from './Favorites/TrackFavorites/favorites.module';

@Module({
  imports: [
    UserModule,
    TracksModule,
    ArtistsModule,
    AlbumModule,
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
})
export class AppModule {}
