import { z } from "zod";

export const CreateContractorDto = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
});

export const UpdateContractorDto = CreateContractorDto.partial();

export type CreateContractorDto = z.infer<typeof CreateContractorDto>;
export type UpdateContractorDto = z.infer<typeof UpdateContractorDto>;
