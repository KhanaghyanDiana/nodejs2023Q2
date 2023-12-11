import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tracks_CRUD } from '../entities/tracks.entity';


@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Tracks_CRUD)
    private readonly trackEntity: Repository<Tracks_CRUD>,
  ) {}
  async getTrackById(id: string) {
    const perTrack = await this.trackEntity.findOne({
      where: { id },
      relations: ['artistId', 'albumId'],
    });
    if (!perTrack) {
      return {
        mes: 'NOT FOUND',
        status: HttpStatus.NOT_FOUND,
      };
    } else {
      return {
        data: perTrack,
        status: HttpStatus.OK,
      };
    }
  }

  async getTracks() {
    const data = await this.trackEntity.find({
      relations: ['artistId', 'albumId'],
    });
    if (data) {
      return {
        data,
        status: HttpStatus.OK,
      };
    }
  }
  async createTrack(name: string, duration: number, artists: any, albums: any) {
    if (!name && !duration) {
      throw new HttpException(
        'Please Provide Correct Format',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newTrack = this.trackEntity.create({
      name,
      duration,
    });

    const savedTrack = await this.trackEntity.save(newTrack);
    savedTrack.artistId = artists.data.artistId;
    savedTrack.albumId = albums.data.albumId;
    await this.trackEntity.save(savedTrack);
    if (savedTrack) {
      return {
        savedTrack,
        status: HttpStatus.CREATED,
      };
    }
  }
  async updateTrackInfo(
    id: string,
    updatedName: string | null,
    updatedDuration: number | null,
  ) {
    const track = await this.trackEntity.findOne({
      where: { id },
      relations: ['artistId', 'albumId'],
    });
    if (!track) {
      return {
        status: HttpStatus.NOT_FOUND,
        mes: 'User not found',
      };
    }
    if (updatedName !== null) {
      const info = { ...track, name: updatedDuration };
      console.log(info, 'info');
      return { data: info, status: HttpStatus.OK };
    }
  }
  async deleteTrackById(id: string) {
    const track = await this.trackEntity.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    if (id) {
      const isDeleted = await this.trackEntity.remove(track);
      if (isDeleted && id) {
        return {
          status: HttpStatus.NO_CONTENT,
          mes: 'TRACK IS DELETED',
        };
      }
    }
  }
}
