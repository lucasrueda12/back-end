import { Router } from 'express';
import { create, deleteProd, getAll, getOne, update } from '../dao/controllers/products.controller.js';
import { authorization } from '../utils.js';


const router = Router();

router.get('/', getAll);

router.get('/:pid', getOne);

router.post("/", authorization('admin'), create);

router.put('/:pid', authorization('admin'), update);

router.delete('/:pid', authorization('admin'), deleteProd);

export default router;
