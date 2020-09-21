/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/shared/auth/jwt-auth.guard";
import { HotelCreateDto } from "../dtos/hotel.dto";
import { Hotel } from "../models/hotel.entity";
import { HotelService } from "../services/hotel.service";

@Controller('api.hotel')
export class HotelController {

  constructor(private readonly hotelService: HotelService) { }

  @Get(':id')
  async get(@Param('id', new ParseIntPipe()) id: number): Promise<Hotel> {
    return this.hotelService.get(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() args: HotelCreateDto, @Req() req: any): Promise<Hotel> {
    const userId = req.user && req.user.id;
    const role = req.user && req.user.role;
    if (!['admin'].includes(role)) {
      args.ownerId = userId;
    }
    return this.hotelService.create(args);
  }
}