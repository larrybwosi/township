import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const { userId, items, totalPrice } = data;
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          totalPrice,
          orderItems: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });

      // Create a pending transaction
      await tx.transaction.create({
        data: {
          orderId: order.id,
          amount: totalPrice,
          status: 'PENDING',
        },
      });

      return order;
    });
  }

  async findByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { orderItems: { include: { product: true } }, transaction: true },
    });
  }
}
