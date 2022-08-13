import { injectable, inject } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { IProduct } from '../models/IProduct';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: ICreateProductDTO): Promise<IProduct> {
    const productExists = await this.productsRepository.findByCode(
      data.code,
      'b6e9be07-28e2-4164-bd43-92a9f12316d9',
    );

    if (productExists) {
      // verify if the name matches
      if (productExists.name !== data.name) {
        throw new ErrorsApp(
          'The product already exists, but the names do not match',
          409,
        );
      }
      // add to product stock
      productExists.quantity += data.quantity;
      await this.productsRepository.save(productExists);

      return productExists;
    }
    const product = await this.productsRepository.create(data);
    return product;
  }
}

export { CreateProductService };
