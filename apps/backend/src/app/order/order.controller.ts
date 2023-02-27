import { UserRole } from '@fit-friends/shared';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { CurrentUserField } from '../user/user.constant';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(RoleGuard)
  @Role(UserRole.Customer)
  @Post('')
  async create(
    @Body() dto: CreateOrderDto,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    return this.orderService.create(dto, userId);
  }
}
