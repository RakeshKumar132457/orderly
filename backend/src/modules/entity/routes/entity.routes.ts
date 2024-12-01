import { Router } from "express";
import { EntityController } from "../controllers/entity.controller";
import { asyncHandler } from "../../../shared/middlewares/async-handler.middleware";


/**
 * @openapi
 * components:
 *   responses:
 *     EntityListResponse:
 *       description: List of entities response
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
 *                   $ref: '#/components/schemas/Entity'
 *     
 *     EntityResponse:
 *       description: Single entity response
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
 *                 $ref: '#/components/schemas/Entity'
 */

/**
 * @openapi
 * tags:
 *   name: Entities
 *   description: Entity management API
 */

/**
 * @openapi
 * /entities:
 *   post:
 *     summary: Create a new entity
 *     tags: [Entities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEntityDto'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/EntityResponse'
 *       409:
 *         description: Entity with this name already exists
 *         $ref: '#/components/responses/Conflict'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 * 
 *   get:
 *     summary: Get all entities
 *     tags: [Entities]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/EntityListResponse'
 * 
 * /entities/{id}:
 *   get:
 *     summary: Get an entity by ID
 *     tags: [Entities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Entity ID
 *     responses:
 *       200:
 *         $ref: '#/components/responses/EntityResponse'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 * 
 *   put:
 *     summary: Update an entity
 *     tags: [Entities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Entity ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEntityDto'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/EntityResponse'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         description: Entity with this name already exists
 *         $ref: '#/components/responses/Conflict'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 * 
 *   delete:
 *     summary: Delete an entity
 *     tags: [Entities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Entity ID
 *     responses:
 *       204:
 *         description: Entity deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

const router = Router();
const controller = new EntityController();

router.post("/", asyncHandler(controller.create.bind(controller)));
router.get("/", asyncHandler(controller.getAll.bind(controller)));
router.get("/:id", asyncHandler(controller.getById.bind(controller)));
router.put("/:id", asyncHandler(controller.update.bind(controller)));
router.delete("/:id", asyncHandler(controller.delete.bind(controller)));

export const entityRoutes = router;
