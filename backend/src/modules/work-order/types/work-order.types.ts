import { z } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     WorkOrderLocation:
 *       type: object
 *       required:
 *         - id
 *         - workOrderId
 *         - locationId
 *         - rate
 *         - quantity
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           format: objectId
 *           description: The auto-generated MongoDB ObjectId
 *         workOrderId:
 *           type: string
 *           format: objectId
 *           description: Reference to the parent work order
 *         locationId:
 *           type: string
 *           format: objectId
 *           description: Reference to the location
 *         rate:
 *           type: number
 *           format: float
 *           minimum: 0
 *           description: Rate for this location
 *         quantity:
 *           type: number
 *           format: float
 *           minimum: 0
 *           description: Quantity for this location
 *         location:
 *           $ref: '#/components/schemas/Location'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     WorkOrder:
 *       type: object
 *       required:
 *         - id
 *         - contractorId
 *         - paymentTerms
 *         - dueDate
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           format: objectId
 *           description: The auto-generated MongoDB ObjectId
 *         contractorId:
 *           type: string
 *           format: objectId
 *           description: Reference to the contractor
 *         paymentTerms:
 *           type: integer
 *           minimum: 1
 *           description: Payment terms in days
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: Due date for the work order
 *         contractor:
 *           $ref: '#/components/schemas/Contractor'
 *         locations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WorkOrderLocation'
 *           description: List of locations assigned to this work order
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     WorkOrderLocationDto:
 *       type: object
 *       required:
 *         - locationId
 *         - rate
 *         - quantity
 *       properties:
 *         locationId:
 *           type: string
 *           format: objectId
 *           description: ID of the location to assign
 *         rate:
 *           type: number
 *           format: float
 *           minimum: 0
 *           description: Rate for this location
 *         quantity:
 *           type: number
 *           format: float
 *           minimum: 0
 *           description: Quantity for this location
 *
 *     CreateWorkOrderDto:
 *       type: object
 *       required:
 *         - contractorId
 *         - paymentTerms
 *         - dueDate
 *         - locations
 *       properties:
 *         contractorId:
 *           type: string
 *           format: objectId
 *           description: ID of the contractor to assign
 *         paymentTerms:
 *           type: integer
 *           minimum: 1
 *           description: Payment terms in days
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: Due date for the work order
 *         locations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WorkOrderLocationDto'
 *           minItems: 1
 *           description: List of locations to assign
 *
 *     UpdateWorkOrderDto:
 *       type: object
 *       properties:
 *         contractorId:
 *           type: string
 *           format: objectId
 *           description: ID of the contractor to assign
 *         paymentTerms:
 *           type: integer
 *           minimum: 1
 *           description: Payment terms in days
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: Due date for the work order
 *         locations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WorkOrderLocationDto'
 *           minItems: 1
 *           description: List of locations to assign
 */

const WorkOrderLocationDto = z.object({
  locationId: z.string().min(1, "Location ID is required"),
  rate: z.number().min(0, "Rate must be non-negative"),
  quantity: z.number().min(0, "Quantity must be non-negative"),
});

export const CreateWorkOrderDto = z.object({
  contractorId: z.string().min(1, "Contractor ID is required"),
  paymentTerms: z.number().min(1, "Payment terms must be positive"),
  dueDate: z.string().min(1, "Due date is required"),
  locations: z
    .array(WorkOrderLocationDto)
    .min(1, "At least one location is required"),
});

export const UpdateWorkOrderDto = z.object({
  contractorId: z.string().min(1, "Contractor ID is required").optional(),
  paymentTerms: z.number().min(1, "Payment terms must be positive").optional(),
  dueDate: z.string().min(1, "Due date is required").optional(),
  locations: z
    .array(WorkOrderLocationDto)
    .min(1, "At least one location is required")
    .optional(),
});

export type CreateWorkOrderDto = z.infer<typeof CreateWorkOrderDto>;
export type UpdateWorkOrderDto = z.infer<typeof UpdateWorkOrderDto>;
export type WorkOrderLocationDto = z.infer<typeof WorkOrderLocationDto>;
