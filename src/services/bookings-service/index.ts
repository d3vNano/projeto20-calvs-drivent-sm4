import { notFoundError, forbiddenError } from '@/errors';
import bookingsRepository from '@/repositories/bookings-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import hotelRepository from '@/repositories/hotel-repository';
import { Booking } from '@prisma/client';

async function getBooking(userId: number) {
  const booking = await bookingsRepository.findBooking(userId);

  if (!booking) {
    throw notFoundError();
  }

  return booking;
}

async function createBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw forbiddenError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (ticket.status !== 'PAID' || !ticket.TicketType.includesHotel || ticket.TicketType.isRemote) {
    throw forbiddenError();
  }

  const roomIdExists = await hotelRepository.findRoomsByRoomId(roomId);

  if (!roomIdExists) {
    throw notFoundError();
  }

  const booking = await bookingsRepository.createBooking(userId, roomIdExists.id);

  return booking;
}

async function updateBookingUser(userId: number, bookingId: number, roomId: number) {
  const verifyBooking = await bookingsRepository.verifyBookingId(bookingId);

  if (!verifyBooking) {
    throw notFoundError();
  }

  if (verifyBooking.userId !== userId) {
    throw forbiddenError();
  }

  const roomIdExists = await hotelRepository.findRoomsByRoomId(roomId);

  if (!roomIdExists) {
    throw notFoundError;
  }

  if (roomIdExists.Booking.length >= roomIdExists.capacity) {
    throw forbiddenError();
  }

  return await bookingsRepository.updateBookingDate(bookingId, roomId);
}

export type CreateBookingParams = Pick<Booking, 'roomId'>;

const bookingsService = {
  getBooking,
  createBooking,
  updateBookingUser,
};

export default bookingsService;
