import { Order } from '@fit-friends/shared';

export class OrderEntity implements Order {
  orderType: string;
  userId: number;
  workoutId?: number;
  sportGymId?: number;
  price: number;
  amount: number;
  totalCost: number;
  paymentMethod: string;

  constructor(entity: Order) {
    this.orderType = entity.orderType;
    this.userId = entity.userId;
    this.workoutId = entity.workoutId;
    this.sportGymId = entity.sportGymId;
    this.price = entity.price;
    this.amount = entity.amount;
    this.totalCost = this.getTotalCost();
    this.paymentMethod = entity.paymentMethod;
  }

  private getTotalCost() {
    return this.price * this.amount;
  }
}
