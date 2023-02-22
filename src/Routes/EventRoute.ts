import { Router } from "express";
const router: Router = Router();
import * as EventController from "../Controllers/EventController";

//create event
router.post("/", EventController.CreateEvent);

//get all event
router.get("/", EventController.getAllEvents);

//get one event
router.get("/:eventId", EventController.getEvent);

//update event
router.patch("/:eventId", EventController.updateEvent);

//delete event
router.delete("/:eventId", EventController.deleteEvent);

export default router;
