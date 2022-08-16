import { CreateProductService } from '@modules/products/services/CreateProductService';
import { ListProductsService } from '@modules/products/services/ListProductsService';
import { ShowProductService } from '@modules/products/services/ShowProductService';
import { DeleteProductService } from '@modules/products/services/DeleteProductService';
import { UpdateProductService } from '@modules/products/services/UpdateProductService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseQueryFilters } from 'typeorm-dynamic-filters';

class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsService);

    const filters = parseQueryFilters(request.query);
    const products = await listProducts.execute(filters);

    return response.json({ success: true, ...products });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showProduct = container.resolve(ShowProductService);

    const productId = request.params.id;

    const user = await showProduct.execute(productId);

    return response.json({ success: true, user });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createProductService = container.resolve(CreateProductService);

    const product = await createProductService.execute(request.body);

    return response.status(201).json({ success: true, product });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const deleteProductService = container.resolve(UpdateProductService);

    const productId = request.params.id;
    const data = request.body;

    const product = await deleteProductService.execute({ productId, data });

    return response.status(201).json({ success: true, product });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteProductService = container.resolve(DeleteProductService);

    const productId = request.params.id;

    const product = await deleteProductService.execute(productId);

    return response.status(201).json({ success: true, product });
  }
}

export { ProductsController };
