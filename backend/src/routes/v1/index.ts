import { Router } from "express";
import { contractorRoutes } from "../../modules/contractor/routes/contractor.routes";

const router = Router();

const defaultRoutes = [
  {
    path: "/contractor",
    route: contractorRoutes,
  },
];

for (const route of defaultRoutes) {
  router.use(route.path, route.route);
}

export const v1Router = router;
