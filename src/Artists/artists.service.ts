import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Artist_Crud } from '../entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist_Crud)
    private readonly artistEntity: Repository<Artist_Crud>,
  ) {}
  async getArtistByID(id: string) {
    const perArtist = await this.artistEntity.findOne({
      where: { id: id },
    });
    if (!perArtist) {
      return {
        mes: 'NOT FOUND',
        status: HttpStatus.NOT_FOUND,
      };
    } else if (typeof id !== 'string') {
      throw new HttpException('Specify correct format', HttpStatus.BAD_REQUEST);
    } else {
      return {
        data: perArtist,
        status: HttpStatus.OK,
      };
    }
  }

  async getArtists() {
    const data = await this.artistEntity.find();
    if (data) {
      return {
        data,
        status: HttpStatus.OK,
      };
    }
  }
  async createArtist(name: string, grammy: boolean) {
    if (!name && !grammy) {
      throw new HttpException(
        'Please Provide Correct Format',
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = await this.artistEntity.create({ name, grammy });
    await this.artistEntity.save(data);

    if (data) {
      return {
        data,
        status: HttpStatus.CREATED,
      };
    }
  }
  async updateArtistInfo(
    id: string,
    updatedName: string,
  ): Promise<{
    data?: any;
    status?: number;
    mes?: string;
  }> {
    const artist = await this.artistEntity.findOne({ where: { artistId: id } });
    if (!artist) {
      return {
        status: HttpStatus.NOT_FOUND,
        mes: 'Artist not found',
      };
    }
    if (updatedName !== null) {
      const info = { ...artist, name: updatedName };
      console.log(info, 'info');
      return { data: info, status: HttpStatus.OK };
    }
  }
  async deleteArtistById(id: string) {
    const artist = await this.artistEntity.findOne({ where: { artistId: id } });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    if (id) {
      const isDeleted = await this.artistEntity.remove(artist);
      if (isDeleted && id) {
        return {
          status: HttpStatus.NO_CONTENT,
          mes: 'ARTIST IS DELETED',
        };
      }
    }
  }
}
