import { Router } from "express";
import { ContractorController } from "../controllers/contractor.controller";
import { asyncHandler } from "../../../shared/middlewares/async-handler.middleware";

const router = Router();
const controller = new ContractorController();

router.post("/", asyncHandler(controller.create.bind(controller)));
router.get("/", asyncHandler(controller.getAll.bind(controller)));
router.get("/:id", asyncHandler(controller.getById.bind(controller)));
router.put("/:id", asyncHandler(controller.update.bind(controller)));
router.delete("/:id", asyncHandler(controller.delete.bind(controller)));

export const contractorRoutes = router;
