import { Request } from 'express'
import NewModule from '../models/NewModulesModel'
import { PaginateResult } from 'mongoose'

class ListNewModulesUseCase {
    async execute(req: Request): Promise<PaginateResult<typeof NewModule>> {
        const { page, limit } = req.query;
        const filters: any = {};
        const options: any = {};
        page ? options.page = page : options.page = 1
        limit ? options.limit = limit : options.limit = 1
        if (req.query.name) {
            if (!filters.$or) filters.$or = [];
            // @ts-ignore
            const searchKeys = req.query.name?.split(' ');
            searchKeys.forEach((key: any) => {
                filters.$or.push({ name: new RegExp(key, 'i') });
            });
        }

        if (req.query.search) {
            if (!filters.$or) filters.$or = [];
            // @ts-ignore
            const searchKeys = req.query.search?.split(' ');
            searchKeys.forEach((key: any) => {
                filters.$or.push({ name: new RegExp(key, 'i') });
                filters.$or.push({ email: new RegExp(key, 'i') });
            });
        }
        const users = await NewModule.paginate(filters, options)
        return users;
    }
}

export default new ListNewModulesUseCase()