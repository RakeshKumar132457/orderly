import { Router } from "express";
import { contractorRoutes } from "../../modules/contractor/routes/contractor.routes";
import { entityRoutes } from "../../modules/entity/routes/entity.routes";
import { locationRoutes } from "../../modules/location/routes/location.routes";
import { workOrderRoutes } from "../../modules/work-order/routes/work-order.routes";
import { billRoutes } from "../../modules/bill/routes/bill.routes";
import { authRoutes } from "../../modules/auth/routes/auth.routes";
import { protect } from "../../shared/middlewares/auth.middleware";

const router = Router();

const publicRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
];

const protectedRoutes = [
  {
    path: "/contractors",
    route: contractorRoutes,
  },
  {
    path: "/entities",
    route: entityRoutes,
  },
  {
    path: "/locations",
    route: locationRoutes,
  },
  {
    path: "/work-orders",
    route: workOrderRoutes,
  },
  {
    path: "/bills",
    route: billRoutes,
  },
];

for (const route of publicRoutes) {
  router.use(route.path, route.route);
}

for (const route of protectedRoutes) {
  router.use(route.path, protect, route.route);
}

export const v1Router = router;
