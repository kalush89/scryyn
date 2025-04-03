import { z } from 'zod';

export const diagnosticProviderBankingSchema = z.object({
    bankAccountNumber: z.string().optional(),
    bankName: z.string().optional(),
    paymentMethod: z.string().optional(),
});
  