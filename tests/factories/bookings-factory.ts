import { prisma } from '@/config';

export async function createBooking(roomId: number, userId: number) {
  return await prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

export async function createBookings(roomId: number, userId: number) {
  return await prisma.booking.createMany({
    data: [
      {
        userId: userId,
        roomId: roomId,
      },
      {
        userId: userId,
        roomId: roomId,
      },
      {
        userId: userId,
        roomId: roomId,
      },
    ],
  });
}
