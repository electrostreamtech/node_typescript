import { Request, Response, NextFunction } from "express";
import { IEvent } from "../Types/IEvent";
import {
  EventValidation,
  EventIdValidation,
  UpdateEventValidation,
} from "../Validations/EventValidation";
import { IUpdateEvent } from "../Types/IUpadateEvent";
import { JsonDB, Config } from "node-json-db";
var randomstring = require("randomstring");
var db = new JsonDB(new Config("myDataBase", true, false, "/"));
/**
 * add new event
 * @param eventModelValidation
 */
const addEvent = async (eventModelValidation: IEvent) => {
  try {
    let ID = await randomstring.generate(6);
    const event = {
      id: ID,
      title: eventModelValidation.title,
      location: eventModelValidation.location,
      date: eventModelValidation.date,
    };
    await db.push(`/eventData/${ID}`, event);
    await db.save();
    return event;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Create a new event
 * @param req
 * @param res
 * @param next
 */
export const CreateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventModelValidation: IEvent = await EventValidation.validateAsync(
      req.body
    );

    if (!eventModelValidation) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    } else {
      const newEvent: any = await addEvent(eventModelValidation);
      if (newEvent) {
        res.status(201).json({
          newEvent,
        });
      } else {
        return next(
          res.status(400).json({
            message: "Invalid details provided.",
          })
        );
      }
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * Get all events
 * @param req
 * @param res
 * @param next
 */
export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getEvents = await db.getData(`/eventData`);

    if (getEvents) {
      const mappedDataArray: Array<Object> = [];
      for (const key in getEvents) {
        const mappedData = {
          ...getEvents[key],
        };
        mappedDataArray.push(mappedData);
      }
      res.status(200).send(mappedDataArray);
    } else {
      return next(
        res.status(404).json({
          message: "Not found.",
        })
      );
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * get one event
 * @param req
 * @param res
 * @param next
 */
export const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventIdValidation = await EventIdValidation.validateAsync(
      req.params.eventId
    );

    if (!eventIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const getEvents = await db.getObject(`/eventData/${eventIdValidation}`);

      if (getEvents) {
        res.status(200).json(getEvents);
      } else {
        return next(
          res.status(404).json({
            message: "Not found.",
          })
        );
      }
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * delete event
 * @param req
 * @param res
 * @param next
 */
export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventIdValidation = await EventIdValidation.validateAsync(
      req.params.eventId
    );

    if (!eventIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      await db.delete(`/eventData/${eventIdValidation}`);
      res.status(200).json({ deletedId: eventIdValidation });
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * Update event
 * @param req
 * @param res
 * @param next
 */
export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventIdValidation = await EventIdValidation.validateAsync(
      req.params.eventId
    );
    if (!eventIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid ID provided.",
        })
      );
    } else {
      let body: IUpdateEvent = req.body;
      const resUpdateEventValidation: IUpdateEvent =
        await UpdateEventValidation.validateAsync(req.body);
      if (!resUpdateEventValidation) {
        return next(
          res.status(400).json({
            message: "Operation failed, invalid details provided.",
          })
        );
      } else {
        let ID = eventIdValidation;
        const event = {
          id: ID,
          title: body.title,
          location: body.location,
          date: body.date,
        };
        await db.push(`/eventData/${ID}`, event);

        if (event) {
          res.status(200).json(event);
        } else {
          return next(
            res.status(404).json({
              message: "Not found.",
            })
          );
        }
      }
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};
