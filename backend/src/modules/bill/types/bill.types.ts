import { z } from "zod";


/**
 * @openapi
 * components:
 *   schemas:
 *     BillLocation:
 *       type: object
 *       required:
 *         - id
 *         - billId
 *         - name
 *         - rate
 *         - quantity
 *       properties:
 *         id:
 *           type: string
 *           format: objectId
 *           description: The auto-generated MongoDB ObjectId
 *         billId:
 *           type: string
 *           format: objectId
 *           description: Reference to the parent bill
 *         name:
 *           type: string
 *           description: Name of the location
 *         rate:
 *           type: number
 *           format: float
 *           minimum: 0
 *           description: Rate charged for the location
 *         quantity:
 *           type: number
 *           format: float
 *           minimum: 0
 *           description: Quantity of work done at the location
 *     
 *     Bill:
 *       type: object
 *       required:
 *         - id
 *         - billNumber
 *         - contractorId
 *         - totalAmount
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           format: objectId
 *           description: The auto-generated MongoDB ObjectId
 *         billNumber:
 *           type: string
 *           description: Unique bill number (format BILL-XX)
 *         contractorId:
 *           type: string
 *           format: objectId
 *           description: Reference to the contractor
 *         totalAmount:
 *           type: number
 *           format: float
 *           minimum: 0
 *           description: Total amount of the bill
 *         contractor:
 *           $ref: '#/components/schemas/Contractor'
 *         locations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BillLocation'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     
 *     BillLocationDto:
 *       type: object
 *       required:
 *         - name
 *         - rate
 *         - quantity
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the location
 *         rate:
 *           type: number
 *           format: float
 *           minimum: 0
 *           description: Rate charged for the location
 *         quantity:
 *           type: number
 *           format: float
 *           minimum: 0
 *           description: Quantity of work done at the location
 *     
 *     CreateBillDto:
 *       type: object
 *       required:
 *         - contractorId
 *         - billNumber
 *         - locations
 *         - totalAmount
 *       properties:
 *         contractorId:
 *           type: string
 *           format: objectId
 *           description: ID of the contractor
 *         billNumber:
 *           type: string
 *           description: Unique bill number
 *         locations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BillLocationDto'
 *           minItems: 1
 *           description: List of locations included in the bill
 *         totalAmount:
 *           type: number
 *           format: float
 *           minimum: 0
 *           description: Total amount of the bill
 */

const BillLocationDto = z.object({
  name: z.string().min(1, "Location name is required"),
  rate: z.number().min(0, "Rate must be non-negative"),
  quantity: z.number().min(0, "Quantity must be non-negative"),
});

export const CreateBillDto = z.object({
  contractorId: z.string().min(1, "Contractor ID is required"),
  billNumber: z.string().min(1, "Bill number is required"),
  locations: z
    .array(BillLocationDto)
    .min(1, "At least one location is required"),
  totalAmount: z.number().min(0, "Total amount must be non-negative"),
});

export type CreateBillDto = z.infer<typeof CreateBillDto>;
export type BillLocationDto = z.infer<typeof BillLocationDto>;
