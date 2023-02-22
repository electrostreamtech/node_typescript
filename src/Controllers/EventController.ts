import { Request, Response, NextFunction } from "express";
import { IEvent } from "../Types/IEvent";
import {
  EventValidation,
  EventIdValidation,
  UpdateEventValidation,
} from "../Validations/EventValidation";
import { IUpdateEvent } from "../Types/IUpadateEvent";

/**
 * add new event
 * @param eventModelValidation
 */
const addEvent = async (eventModelValidation: IEvent) => {
  try {
    const event = {
      title: eventModelValidation.title,
      location: eventModelValidation.location,
      date: eventModelValidation.date,
    };
    const savedEvent = "";

    return savedEvent;
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
      const newEvent = await addEvent(eventModelValidation);
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
    const getEvents = "";

    if (getEvents) {
      res.status(200).json(getEvents);
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
      const getEvents = "";

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
      const deleteEvent = "";

      if (deleteEvent) {
        res.status(200).json(deleteEvent);
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
    const resUpdateEventValidation: IUpdateEvent =
      await UpdateEventValidation.validateAsync(req.body);

    if (!UpdateEventValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const updatedEvents = "";

      if (updatedEvents) {
        res.status(200).json(updatedEvents);
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
