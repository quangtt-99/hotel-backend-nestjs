/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository } from 'typeorm';
import { HotelQueryDto } from '../dtos/hotel-query.dto';
import { Hotel } from '../models/hotel.entity';

@EntityRepository(Hotel)
export class HotelRepository extends AbstractRepository<Hotel> {
  create(data: object) {
    return this.repository.create(data);
  }

  save(hotel: Hotel, data?: object): Promise<Hotel> {
    if (data) {
      hotel = this.repository.merge(hotel, data);
    }
    return this.repository.save(hotel);
  }

  getById(id: number): Promise<Hotel> {
    return this.repository.findOne({
      where: { id, isDeleted: false },
    });
  }

  list(page: number, perpage: number, query?: HotelQueryDto) {
    const queryBuilder = this.repository
      .createQueryBuilder('hotel')
      .where(`hotel.isDeleted = FALSE`)
      .take(perpage)
      .skip(page * perpage);
    return queryBuilder.getManyAndCount();
  }
}