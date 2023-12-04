import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Album_Crud } from '../entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album_Crud])],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
