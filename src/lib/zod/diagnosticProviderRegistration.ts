import { z } from 'zod';
import { diagnosticProviderSchema } from './diagnosticProvider';
import { diagnosticProviderManagerSchema } from './diagnosticProviderManager';
import { diagnosticProviderBankingSchema } from './diagnosticProviderBanking';

export const diagnosticProviderRegistrationSchema = z.object({
  diagnosticProvider: diagnosticProviderSchema,
  manager: diagnosticProviderManagerSchema ,
});