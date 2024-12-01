import { z } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     Entity:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           format: objectId
 *           description: The auto-generated MongoDB ObjectId
 *         name:
 *           type: string
 *           description: The name of the entity (unique)
 *         locations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Location'
 *           description: List of locations associated with this entity
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the entity was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the entity was last updated
 *     
 *     CreateEntityDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           description: The name of the entity (must be unique)
 *     
 *     UpdateEntityDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           description: The name of the entity (must be unique)
 *     
 *     ApiResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [success, error]
 *           description: The status of the response
 *         statusCode:
 *           type: integer
 *           description: HTTP status code
 *         timeStamp:
 *           type: string
 *           format: date-time
 *           description: Response timestamp
 *         path:
 *           type: string
 *           description: Request path
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/Entity'
 *             - type: array
 *               items:
 *                 $ref: '#/components/schemas/Entity'
 *             - type: 'null'
 *           description: Response data
 *         message:
 *           type: string
 *           description: Optional success/error message
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *           description: Optional array of error details
 */

export const CreateEntityDto = z.object({
  name: z.string().min(1, "Name is required"),
});

export const UpdateEntityDto = CreateEntityDto.partial();

export type CreateEntityDto = z.infer<typeof CreateEntityDto>;
export type UpdateEntityDto = z.infer<typeof UpdateEntityDto>;
