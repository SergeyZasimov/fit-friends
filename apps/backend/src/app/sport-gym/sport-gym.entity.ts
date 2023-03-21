import { SportGym } from '@fit-friends/shared';

export class SportGymEntity implements SportGym {
  title: string;
  location: string;
  isVerified: boolean;
  parameters: string[];
  photos: string[];
  description: string;
  oneWorkoutPrice: number;

  constructor(entity: SportGym) {
    this.title = entity.title;
    this.location = entity.location;
    this.isVerified = entity.isVerified;
    this.parameters = entity.parameters;
    this.photos = entity.photos ?? [];
    this.description = entity.description;
    this.oneWorkoutPrice = entity.oneWorkoutPrice;
  }
}
