import { Router } from "express";
import { LocationController } from "../controllers/location.controller";
import { asyncHandler } from "../../../shared/middlewares/async-handler.middleware";


/**
 * @openapi
 * components:
 *   responses:
 *     LocationListResponse:
 *       description: List of locations response
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
 *                   $ref: '#/components/schemas/Location'
 *     
 *     LocationResponse:
 *       description: Single location response
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
 *                 $ref: '#/components/schemas/Location'
 */

/**
 * @openapi
 * tags:
 *   name: Locations
 *   description: Location management API
 */

/**
 * @openapi
 * /locations:
 *   post:
 *     summary: Create a new location
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLocationDto'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/LocationResponse'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 * 
 *   get:
 *     summary: Get all locations
 *     tags: [Locations]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/LocationListResponse'
 * 
 * /locations/{id}:
 *   get:
 *     summary: Get a location by ID
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Location ID
 *     responses:
 *       200:
 *         $ref: '#/components/responses/LocationResponse'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 * 
 *   put:
 *     summary: Update a location
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Location ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateLocationDto'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/LocationResponse'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 * 
 *   delete:
 *     summary: Delete a location
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Location ID
 *     responses:
 *       204:
 *         description: Location deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 * 
 * /locations/{id}/complete:
 *   patch:
 *     summary: Mark a location as complete
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Location ID
 *     responses:
 *       200:
 *         $ref: '#/components/responses/LocationResponse'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

const router = Router();
const controller = new LocationController();

router.post("/", asyncHandler(controller.create.bind(controller)));
router.get("/", asyncHandler(controller.getAll.bind(controller)));
router.get("/:id", asyncHandler(controller.getById.bind(controller)));
router.put("/:id", asyncHandler(controller.update.bind(controller)));
router.delete("/:id", asyncHandler(controller.delete.bind(controller)));
router.patch(
  "/:id/complete",
  asyncHandler(controller.markAsComplete.bind(controller))
);

export const locationRoutes = router;
