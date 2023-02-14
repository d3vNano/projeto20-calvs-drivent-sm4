import { CreateBookingParams } from '@/services/bookings-service';
import joi from 'joi';

export const createBookingSchema = joi.object<CreateBookingParams>({
  roomId: joi.number(),
});
