import chalk from 'chalk';
import { plainToInstance } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';
import { EnvConstraint, EnvValidationMessage } from './config.constant';

const { StringRequired, PortNotValid, IntRequired, Required } =
  EnvValidationMessage;

class EnvironmentConfig {
  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  APP_HOST: string;

  @Max(EnvConstraint.Port.Max, { message: PortNotValid })
  @Min(EnvConstraint.Port.Min, { message: PortNotValid })
  @IsInt({ message: IntRequired })
  @IsNotEmpty({ message: Required })
  APP_PORT: number;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  @IsNotEmpty({ message: Required })
  DATABASE_URL: string;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  UPLOAD_FOLDER: string;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  STATIC_FOLDER: string;
}

export const validateEnvironments = (
  config: Record<string, string | number>
) => {
  const environmentConfig = plainToInstance(EnvironmentConfig, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(environmentConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const messages = errors
      .map((error) => {
        const property = error.property;
        const constraint = Object.values(error.constraints).join(', ');
        return `${property} - ${constraint}`;
      })
      .join('\n');
    throw new Error(chalk.red(`\n${messages}`));
  }
  return environmentConfig;
};
