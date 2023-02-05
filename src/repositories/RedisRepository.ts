import { redisClient } from '../app';

export default class RedisRepository {
  async pushMessage(message: object): Promise<void> {
    await redisClient.LPUSH('messages', JSON.stringify(message), {
      EX: 180,
    });

    const length = await redisClient.LLEN('messages');

    if (length > 10) {
      await redisClient.RPOP('messages');
    }
  }

  async getMessages() {
    const messages = await redisClient.LRANGE('messages', 0, -1);
    return messages.map((obj: string) => JSON.parse(obj));
  }
}
