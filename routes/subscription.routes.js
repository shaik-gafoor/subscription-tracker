import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getuserSubscription,
} from "../controllers/subscription.controller.js";
const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({ title: "GET all subscriptions" });
});
subscriptionRouter.get("/:id", (req, res) => {
  res.send({ title: "GET subscriptions details" });
});
subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/", (req, res) => {
  res.send({ title: "UPDATE subscriptions" });
});
subscriptionRouter.delete("/", (req, res) => {
  res.send({ title: "DELETE subscriptions" });
});
subscriptionRouter.get("/user/:id", authorize, getuserSubscription);
subscriptionRouter.get("/:id/cancel", (req, res) => {
  res.send({ title: "CANCEL subscriptions" });
});
subscriptionRouter.get("/upcoming", (req, res) => {
  res.send({ title: "GET upcomingsubscriptions" });
});

export default subscriptionRouter;
