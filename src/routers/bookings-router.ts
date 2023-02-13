import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getBooking, insertBooking, updateBooking } from '@/controllers';
import { createBookingSchema } from '@/schemas';

const bookingsRouter = Router();

bookingsRouter
  .all('/*', authenticateToken)
  .get('', getBooking)
  .post('', validateBody(createBookingSchema), insertBooking)
  .put('/:bookingId', validateBody(createBookingSchema), updateBooking);

export { bookingsRouter };
