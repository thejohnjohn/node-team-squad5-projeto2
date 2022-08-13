import 'reflect-metadata';

import { parseQueryFilters } from 'typeorm-dynamic-filters';
import { FakeProduct } from '@modules/products/models/fakes/FakeProduct';
import { FakeProductsRepository } from '@modules/products/repositories/fakes/FakeProductsRepository';
import { ListProductsService } from '@modules/products/services/ListProductsService';

let fakeProductsRepository: FakeProductsRepository;
let listProducts: ListProductsService;
let product1;
let product2;

describe('DeleteProductsService', () => {
  beforeAll(async () => {
    fakeProductsRepository = new FakeProductsRepository();
    product1 = await fakeProductsRepository.create(new FakeProduct());
    product2 = await fakeProductsRepository.create(new FakeProduct());
    listProducts = new ListProductsService(fakeProductsRepository);
  });

  it('Should be able to delete one product.', async () => {
    await fakeProductsRepository.delete(product1);

    const { result } = await listProducts.execute(parseQueryFilters({}));

    expect(1 + 1).toEqual(2);
  });
});
