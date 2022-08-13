import { injectable, inject } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { IProduct } from '../models/IProduct';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface IRequest {
  productId: string;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ productId }: IRequest): Promise<IProduct> {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new ErrorsApp('Product not found', 404);
    }

    await this.productsRepository.save(product);

    return product;
  }
}

export { UpdateProductService };
