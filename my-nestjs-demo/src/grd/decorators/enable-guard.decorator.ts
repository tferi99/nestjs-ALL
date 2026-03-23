export const ENABLE_GUARD_KEY = 'EnableGuard';
export const ENABLE_GUARD_CONFIGS_KEY = 'EnableGuardConfigs';

export interface GuardConfig {
  target: string;
  enabled: boolean;
}

export const GUARD_ENABLED_DEFAULT = true;

export const EnableGuard = (guardConfig: GuardConfig) => {
  console.log('EnableGuard factory: ', guardConfig);
  const factory = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const existingGuardConfigs: Map<string, GuardConfig> = Reflect.getOwnMetadata(ENABLE_GUARD_CONFIGS_KEY, target, propertyKey) || new Map<string, GuardConfig>();
    Reflect.defineMetadata(ENABLE_GUARD_CONFIGS_KEY, existingGuardConfigs, descriptor.value);

    existingGuardConfigs.set(guardConfig.target, guardConfig);
    Reflect.defineMetadata(ENABLE_GUARD_CONFIGS_KEY, existingGuardConfigs, target, propertyKey);

    console.log('EnableGuard changed:', existingGuardConfigs);
  };
  return factory;
};
