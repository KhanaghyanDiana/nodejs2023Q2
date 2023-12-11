import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album_Crud } from '../entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album_Crud)
    private readonly albumEntity: Repository<Album_Crud>,
  ) {}
  async getAlbumByiD(id: string) {
    const album = await this.albumEntity.findOne({ where: { albumId: id } });
    if (!album) {
      return {
        mes: 'NOT FOUND',
        status: HttpStatus.NOT_FOUND,
      };
    } else if (typeof id !== 'string') {
      throw new HttpException('Specify correct format', HttpStatus.BAD_REQUEST);
    } else {
      return {
        data: album,
        status: HttpStatus.OK,
      };
    }
  }

  async getAlbums() {
    const data = await this.albumEntity.find();
    if (data) {
      return {
        data,
        status: HttpStatus.OK,
      };
    }
  }
  async createAlbum(name: string, year: number) {
    if (!name && !year) {
      throw new HttpException(
        'Please Provide Correct Format',
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = await this.albumEntity.save({
      name,
      year,
    });
    if (data) {
      return {
        data,
        status: HttpStatus.CREATED,
      };
    }
  }
  async updateAlbum(
    id: string,
    updatedName: string,
  ): Promise<{
    data?: any;
    status?: number;
    mes?: string;
  }> {

    const artist = await this.albumEntity.findOne({ where: { albumId:id } });
    if (!artist) {
      return {
        status: HttpStatus.NOT_FOUND,
        mes: 'Artist not found',
      };
    }
    if (updatedName !== null) {
      const info = { ...artist, name: updatedName };
      return { data: info, status: HttpStatus.OK };
    }
  }
  async deleteAlbumById(id: string) {
    const album = await this.albumEntity.findOne({ where: { albumId: id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    if (id) {
      const isDeleted = await this.albumEntity.remove(album);
      if (isDeleted && id) {
        return {
          status: HttpStatus.NO_CONTENT,
          mes: 'AlBUM IS DELETED',
        };
      }
    }
  }
}
