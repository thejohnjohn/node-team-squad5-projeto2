import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { IProduct } from '@modules/products/models/IProduct';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { Repository } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';

import { AppDataSource } from '@shared/infra/typeorm/';

import { Product } from '../models/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Product>(Product);
  }
  public async findByCode(code: string): Promise<IProduct> {
    const product = await this.ormRepository.findOne({
      where: { code },
    });

    return product;
  }

  public async getTotal(): Promise<number> {
    const total = await this.ormRepository.count();

    return total;
  }

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);
    console.log(data);
    await this.ormRepository.save(product);

    return product;
  }

  public async getAll(filter: IFilterQuery): Promise<[Product[], number]> {
    const userFilterBuilder = new FilterBuilder(this.ormRepository, 'products');
    const qb = userFilterBuilder.build(filter);

    const result = await qb.getManyAndCount();

    return result;
  }

  public async save(product: Product): Promise<void> {
    await this.ormRepository.save(product);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return product;
  }

  public async delete(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }
}

export { ProductsRepository };
