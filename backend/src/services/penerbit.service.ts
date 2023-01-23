import { UserService } from './user.service';
import { Service } from 'typedi';
import { Penerbit } from '../database/entities/penerbit.entity';
import type { PenerbitDTO } from '../validations/penerbit.validation';
import { Errors } from '../utils/api.util';

@Service()
export class PenerbitService {
    constructor(private readonly userService: UserService) {}

    /*  Query SQL Get Penerbit
        SELECT * FROM penerbit

    */
    async getPenerbit(): Promise<Penerbit[]> {
        const penerbit = await Penerbit.find();

        return penerbit;
    }

    /*  Query SQL Add Penerbit
        Make penerbit name into this format 'penerbit-name'
        example, penerbitName = Good Company
        then, the id become good-company

        INSERT INTO TABLE penerbit VALUES(convert(body.penerbitName),
                                          body.penerbitName)
    */
    async addPenerbit(dto: PenerbitDTO, userId: number) {
        const isAdmin = await this.userService.isAdmin(userId);

        if (!isAdmin) {
            throw Errors.NO_PERMISSION;
        }

        const penerbitId = dto.nama.replace(/ /g, '-').toLowerCase();
        const checkPenerbit = await Penerbit.findOneBy({ penerbitId });

        if (checkPenerbit) {
            throw Errors.PENERBIT_NAME_CONFLICT;
        }

        const penerbit = Penerbit.create({ penerbitId, ...dto });

        await Penerbit.save(penerbit);
    }
}
