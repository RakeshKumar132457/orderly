import { Router } from "express";
import { ContractorController } from "../controllers/contractor.controller";
import { asyncHandler } from "../../../shared/middlewares/async-handler.middleware";

/**
 * @openapi
 * tags:
 *   name: Contractors
 *   description: Contractor management API
 */

/**
 * @openapi
 * /contractors:
 *   post:
 *     summary: Create a new contractor
 *     tags: [Contractors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateContractorDto'
 *     responses:
 *       201:
 *         description: Contractor created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 timeStamp:
 *                   type: string
 *                   format: date-time
 *                 path:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Contractor'
 *       409:
 *         description: Phone number already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   get:
 *     summary: Get all contractors
 *     tags: [Contractors]
 *     responses:
 *       200:
 *         description: List of contractors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 timeStamp:
 *                   type: string
 *                   format: date-time
 *                 path:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contractor'
 */

/**
 * @openapi
 * /contractors/{id}:
 *   get:
 *     summary: Get a contractor by ID
 *     tags: [Contractors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Contractor ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Contractor retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Contractor'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 *   put:
 *     summary: Update a contractor
 *     tags: [Contractors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateContractorDto'
 *     responses:
 *       200:
 *         description: Contractor updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Contractor'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *
 *   delete:
 *     summary: Delete a contractor
 *     tags: [Contractors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       204:
 *         description: Contractor deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

const router = Router();
const controller = new ContractorController();

router.post("/", asyncHandler(controller.create.bind(controller)));
router.get("/", asyncHandler(controller.getAll.bind(controller)));
router.get("/:id", asyncHandler(controller.getById.bind(controller)));
router.put("/:id", asyncHandler(controller.update.bind(controller)));
router.delete("/:id", asyncHandler(controller.delete.bind(controller)));

export const contractorRoutes = router;
