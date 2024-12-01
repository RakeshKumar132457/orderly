import { Router } from "express";
import { WorkOrderController } from "../controllers/work-order.controller";
import { asyncHandler } from "../../../shared/middlewares/async-handler.middleware";


/**
 * @openapi
 * components:
 *   responses:
 *     WorkOrderListResponse:
 *       description: List of work orders response
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
 *                   $ref: '#/components/schemas/WorkOrder'
 *     
 *     WorkOrderResponse:
 *       description: Single work order response
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
 *                 $ref: '#/components/schemas/WorkOrder'
 */

/**
 * @openapi
 * tags:
 *   name: Work Orders
 *   description: Work order management API
 */

/**
 * @openapi
 * /work-orders:
 *   post:
 *     summary: Create a new work order
 *     tags: [Work Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWorkOrderDto'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/WorkOrderResponse'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *   
 *   get:
 *     summary: Get all work orders
 *     tags: [Work Orders]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/WorkOrderListResponse'
 * 
 * /work-orders/{id}:
 *   get:
 *     summary: Get a work order by ID
 *     tags: [Work Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Work Order ID
 *     responses:
 *       200:
 *         $ref: '#/components/responses/WorkOrderResponse'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   
 *   put:
 *     summary: Update a work order
 *     tags: [Work Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Work Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateWorkOrderDto'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/WorkOrderResponse'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *   
 *   delete:
 *     summary: Delete a work order
 *     tags: [Work Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Work Order ID
 *     responses:
 *       204:
 *         description: Work order deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

const router = Router();
const controller = new WorkOrderController();

router.post("/", asyncHandler(controller.create.bind(controller)));
router.get("/", asyncHandler(controller.getAll.bind(controller)));
router.get("/:id", asyncHandler(controller.getById.bind(controller)));
router.put("/:id", asyncHandler(controller.update.bind(controller)));
router.delete("/:id", asyncHandler(controller.delete.bind(controller)));

export const workOrderRoutes = router;
