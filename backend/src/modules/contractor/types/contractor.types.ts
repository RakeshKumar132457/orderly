import { z } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     Contractor:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - phone
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           format: objectId
 *           description: The auto-generated MongoDB ObjectId
 *         name:
 *           type: string
 *           description: The name of the contractor
 *         phone:
 *           type: string
 *           description: The phone number of the contractor (unique)
 *           minLength: 10
 *         workOrders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WorkOrder'
 *           description: List of work orders assigned to the contractor
 *         bills:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Bill'
 *           description: List of bills associated with the contractor
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     
 *     CreateContractorDto:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           description: The name of the contractor
 *         phone:
 *           type: string
 *           minLength: 10
 *           description: The phone number of the contractor (must be unique)
 *     
 *     UpdateContractorDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           description: The name of the contractor
 *         phone:
 *           type: string
 *           minLength: 10
 *           description: The phone number of the contractor (must be unique)
 */
export const CreateContractorDto = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
});

export const UpdateContractorDto = CreateContractorDto.partial();

export type CreateContractorDto = z.infer<typeof CreateContractorDto>;
export type UpdateContractorDto = z.infer<typeof UpdateContractorDto>;
