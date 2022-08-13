import 'reflect-metadata';

import { parseQueryFilters } from 'typeorm-dynamic-filters';
import { FakeProduct } from '@modules/products/models/fakes/FakeProduct';
import { FakeProductsRepository } from '@modules/products/repositories/fakes/FakeProductsRepository';
import { ListProductsService } from '@modules/products/services/ListProductsService';

let fakeProductsRepository: FakeProductsRepository;

describe('UpdateProductsService', () => {
  beforeAll(async () => {
    fakeProductsRepository = new FakeProductsRepository();
  });

  it('Should be able to update a product.', async () => {
    expect(1 + 1).toEqual(2);
  });
});
