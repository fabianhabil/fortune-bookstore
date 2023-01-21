import { Service } from 'typedi';
import { Penerbit } from '../database/entities/penerbit.entity';
import type { PenerbitDTO } from '../validations/penerbit.validation';

@Service()
export class PenerbitService {
    async getPenerbit() {
        const penerbit = await Penerbit.find();

        return penerbit;
    }

    async createPenerbit(dto: PenerbitDTO) {
        const penerbitId = dto.nama.replace(/ /g, '-').toLowerCase();
        const penerbit = Penerbit.create({ penerbitId, ...dto });

        await Penerbit.save(penerbit);
    }
}
