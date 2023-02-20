import chalk from 'chalk';
import { plainToInstance } from 'class-transformer';
import { IsInt, IsString, Max, Min, validateSync } from 'class-validator';
import { EnvConstraint, EnvValidationMessage } from './config.constant';

const { StringRequired, PortNotValid, IntRequired } = EnvValidationMessage;

class EnvironmentConfig {
  @IsString({ message: StringRequired })
  HOST: string;

  @Max(EnvConstraint.Port.Max, { message: PortNotValid })
  @Min(EnvConstraint.Port.Min, { message: PortNotValid })
  @IsInt({ message: IntRequired })
  PORT: number;

  @IsString({ message: StringRequired })
  DATABASE_URL: string;
}

export const validateEnvironments = (
  config: Record<string, string | number>
) => {
  const environmentConfig = plainToInstance(EnvironmentConfig, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(environmentConfig, {
    skipMissingProperties: true,
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
