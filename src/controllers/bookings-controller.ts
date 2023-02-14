import { AuthenticatedRequest } from '@/middlewares';
import bookingsService from '@/services/bookings-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const bookings = await bookingsService.getBooking(userId);

    return res.status(httpStatus.OK).send({ id: bookings.id, Room: bookings.Room });
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function insertBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = Number(req.body.roomId);

  try {
    await bookingsService.createBooking(userId, roomId);

    return res.sendStatus(httpStatus.OK);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (err.name === 'Forbidden') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    } else {
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const bookingId = Number(req.params.bookingId);
  const roomId = Number(req.body.roomId);

  try {
    await bookingsService.updateBookingUser(userId, bookingId, roomId);

    return res.sendStatus(httpStatus.OK);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
