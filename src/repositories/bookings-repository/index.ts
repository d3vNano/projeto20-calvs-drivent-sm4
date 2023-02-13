import { prisma } from '@/config';

async function findBooking(userId: number) {
  return await prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

async function createBooking(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId,
    },
  });
}

async function updateBookingDate(bookingId: number, roomId: number) {
  return await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId: roomId,
    },
  });
}

async function verifyBookingId(bookingId: number) {
  return await prisma.booking.findFirst({
    where: {
      id: bookingId,
    },
  });
}

const bookingsRepository = {
  findBooking,
  createBooking,
  updateBookingDate,
  verifyBookingId,
};

export default bookingsRepository;
