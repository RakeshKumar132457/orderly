import { Router } from "express";
import { BillController } from "../controllers/bill.controller";
import { asyncHandler } from "../../../shared/middlewares/async-handler.middleware";

/**
 * @openapi
 * components:
 *   responses:
 *     BillListResponse:
 *       description: List of bills response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: success
 *               statusCode:
 *                 type: integer
 *               timeStamp:
 *                 type: string
 *                 format: date-time
 *               path:
 *                 type: string
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Bill'
 *     
 *     BillResponse:
 *       description: Single bill response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: success
 *               statusCode:
 *                 type: integer
 *               timeStamp:
 *                 type: string
 *                 format: date-time
 *               path:
 *                 type: string
 *               data:
 *                 $ref: '#/components/schemas/Bill'
 */

/**
 * @openapi
 * tags:
 *   name: Bills
 *   description: Bill management and generation API
 */

/**
 * @openapi
 * /bills/generate:
 *   post:
 *     summary: Generate bills for completed locations
 *     description: Generates bills for all contractors with completed locations that haven't been billed yet
 *     tags: [Bills]
 *     responses:
 *       201:
 *         $ref: '#/components/responses/BillListResponse'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 * 
 * /bills:
 *   get:
 *     summary: Get all bills
 *     tags: [Bills]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/BillListResponse'
 * 
 * /bills/{id}:
 *   get:
 *     summary: Get a bill by ID
 *     tags: [Bills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Bill ID
 *     responses:
 *       200:
 *         $ref: '#/components/responses/BillResponse'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 * 
 * /bills/contractor/{contractorId}:
 *   get:
 *     summary: Get all bills for a contractor
 *     tags: [Bills]
 *     parameters:
 *       - in: path
 *         name: contractorId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Contractor ID
 *     responses:
 *       200:
 *         $ref: '#/components/responses/BillListResponse'
 */

const router = Router();
const controller = new BillController();

router.post(
  "/generate",
  asyncHandler(controller.generateBills.bind(controller))
);
router.get("/", asyncHandler(controller.getAll.bind(controller)));
router.get("/:id", asyncHandler(controller.getById.bind(controller)));
router.get(
  "/contractor/:contractorId",
  asyncHandler(controller.getByContractor.bind(controller))
);

export const billRoutes = router;
