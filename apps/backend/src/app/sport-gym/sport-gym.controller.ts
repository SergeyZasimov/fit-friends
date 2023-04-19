import { UrlDomain, UrlParams, UrlRoute } from '@fit-friends/shared';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { DbIdValidationPipe } from '../pipes/db-id-validation.pipe';
import { QuerySportGymDto } from './dto/query-sport-gym.dto';
import { SportGymService } from './sport-gym.service';

@Controller(UrlDomain.SportGym)
export class SportGymController {
  constructor(private readonly sportGymService: SportGymService) {}

  @Get()
  async showMany(@Query() query: QuerySportGymDto) {
    return this.sportGymService.getMany(query);
  }

  @Get(`${UrlRoute.Info}`)
  async showGymsInfo() {
    return this.sportGymService.getInfo();
  }

  @Get(`:${UrlParams.Id}`)
  async showOne(@Param(UrlParams.Id, DbIdValidationPipe) id: number) {
    return this.sportGymService.getOne(id);
  }
}
