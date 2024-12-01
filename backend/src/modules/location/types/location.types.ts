import { z } from "zod";
import { LocationState } from "@prisma/client";


/**
 * @openapi
 * components:
 *   schemas:
 *     LocationState:
 *       type: string
 *       enum: [READY, COMPLETED]
 *       description: The current state of the location
 *     
 *     Location:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - entityId
 *         - state
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           format: objectId
 *           description: The auto-generated MongoDB ObjectId
 *         name:
 *           type: string
 *           description: The name of the location
 *         entityId:
 *           type: string
 *           format: objectId
 *           description: The ID of the parent entity
 *         state:
 *           $ref: '#/components/schemas/LocationState'
 *         entity:
 *           $ref: '#/components/schemas/Entity'
 *         workOrders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WorkOrderLocation'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     
 *     CreateLocationDto:
 *       type: object
 *       required:
 *         - name
 *         - entityId
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           description: The name of the location
 *         entityId:
 *           type: string
 *           format: objectId
 *           description: The ID of the parent entity
 *     
 *     UpdateLocationDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           description: The name of the location
 *         entityId:
 *           type: string
 *           format: objectId
 *           description: The ID of the parent entity
 *         state:
 *           $ref: '#/components/schemas/LocationState'
 */

export const CreateLocationDto = z.object({
  name: z.string().min(1, "Name is required"),
  entityId: z.string().min(1, "Entity ID is required"),
});

export const UpdateLocationDto = z.object({
  name: z.string().min(1, "Name is required").optional(),
  entityId: z.string().min(1, "Entity ID is required").optional(),
  state: z.enum([LocationState.READY, LocationState.COMPLETED]).optional(),
});

export type CreateLocationDto = z.infer<typeof CreateLocationDto>;
export type UpdateLocationDto = z.infer<typeof UpdateLocationDto>;
