export const EnvValidationMessage = {
  Required: 'required',
  StringRequired: 'must be string',
  IntRequired: 'must be integer',
  PortNotValid: 'port must be between 0 and 65535',
  JwtAlgorithmsNotValid: 'jwt sign algorithm not supported',
} as const;

export const EnvConstraint = {
  Port: {
    Min: 0,
    Max: 65535,
  },
};
