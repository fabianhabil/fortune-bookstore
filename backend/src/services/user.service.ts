import { User } from '../database/entities/user.entity';
import { Errors } from '../utils/api.util';

class UserService {

    async get(id: number) {
        const user = await User.findOneBy({ id });
        if (!user) {
            throw Errors.NO_SESSION;
        }

        return user;
    }

}

export const userService = new UserService();