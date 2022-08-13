import { injectable, inject } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { IProduct } from '../models/IProduct';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface IRequest {
  productId: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ productId }: IRequest) {
    const productExists = await this.productsRepository.findById(productId);

    if (!productExists) {
      throw new ErrorsApp('Product not found', 404);
    }

    await this.productsRepository.delete(productExists);
  }
}

export { DeleteProductService };
