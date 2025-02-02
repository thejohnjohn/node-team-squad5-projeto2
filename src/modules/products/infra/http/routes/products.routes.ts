import { authMiddleware } from '@modules/users/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { ProductsController } from '../controllers/ProductsController';
import {
  createProductValidate,
  listProductValidate,
  paramsIdValidate,
} from '../validations/products.validation';

const productsRoutes = Router();

productsRoutes.use(authMiddleware);

const productsController = new ProductsController();

productsRoutes.post('/', createProductValidate, productsController.create);

productsRoutes.put('/:id', createProductValidate, productsController.update);

productsRoutes.get('/:id', paramsIdValidate, productsController.show);

productsRoutes.get('/', listProductValidate, productsController.index);

productsRoutes.delete('/:id', paramsIdValidate, productsController.delete);

export { productsRoutes };
