import { UrlDomain, UserRole } from '@fit-friends/shared';
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { CurrentUserField } from '../user/user.constant';
import { fillObject } from '../utils/helpers';
import { CreatePersonalTrainingDto } from './dto/create-personal-training.dto';
import { UpdatePersonalTrainingDto } from './dto/update-personal-training.dto';
import { PersonalTrainingService } from './personal-training.service';
import { PersonalTrainingRdo } from './rdo/personal-training.rdo';

@Controller(UrlDomain.PersonalTraining)
export class PersonalTrainingController {
  constructor(
    private readonly personalTrainingService: PersonalTrainingService
  ) {}

  @UseGuards(RoleGuard)
  @Role(UserRole.Customer)
  @Post()
  async create(
    @Body() dto: CreatePersonalTrainingDto,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    const result = await this.personalTrainingService.create(dto, userId);
    return fillObject(PersonalTrainingRdo, result);
  }

  @Patch()
  async update(
    @Body() dto: UpdatePersonalTrainingDto,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    const result = await this.personalTrainingService.update(dto, userId);
    return fillObject(PersonalTrainingRdo, result);
  }

  @Get()
  async showRequestsToConductor(
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    const result = await this.personalTrainingService.getRequestsToConductor(
      userId
    );
    return fillObject(PersonalTrainingRdo, result);
  }
}
