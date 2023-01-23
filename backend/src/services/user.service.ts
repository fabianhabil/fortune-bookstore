import { Service } from 'typedi';
import { User } from '../database/entities/user.entity';
import { Errors } from '../utils/api.util';

@Service()
export class UserService {
    /*  Query SQL Get User
        SELECT * FROM user WHERE userId = body.userId
    */
    async getProfile(userId: number): Promise<User | null> {
        const user = User.findOne({
            where: { userId },
            select: { password: false }
        });

        if (!user) {
            throw Errors.USER_NOT_FOUND;
        }

        return user;
    }

    /*  Query SQL Topup User
        UPDATE user
        SET
            saldo = saldo + body.tambahSaldo
        WHERE id_user = body.id_user
    */
    async topup(userId: number, dto: { saldo: number }) {
        const user = (await this.getProfile(userId)) as User;
        user.saldo = user.saldo + dto.saldo;

        await user?.save();

        return user;
    }

    async isAdmin(userId: number): Promise<boolean> {
        const admin = await this.getProfile(userId);

        if (admin?.role !== 1) {
            return false;
        } else {
            return true;
        }
    }
}
