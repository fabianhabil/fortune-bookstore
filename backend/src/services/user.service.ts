import { Service } from 'typedi';
import { User } from '../database/entities/user.entity';
import { Errors } from '../utils/api.util';

@Service()
export class UserService {
    async getProfile(userId: number) {
        const user = User.findOne({
            where: { userId },
            select: { password: false }
        });

        if (!user) {
            throw Errors.NO_SESSION;
        }

        return user;
    }
}