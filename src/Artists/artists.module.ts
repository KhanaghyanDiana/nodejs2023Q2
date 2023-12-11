import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { Artist_Crud } from '../entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist_Crud])],
  providers: [ArtistsService],
  controllers: [ArtistsController],
})
export class ArtistsModule {}
