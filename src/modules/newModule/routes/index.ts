import { Router } from 'express'
import { Auth } from '../../../../shared/middlewares/auth';
import NewModulesController from '../controllers/NewModuleController';

const NewModuleRoutes = Router()

NewModuleRoutes.post('/user', Auth, NewModulesController.create);
NewModuleRoutes.get('/user/:id', Auth, NewModulesController.read);
NewModuleRoutes.put('/user/:id', Auth, NewModulesController.update);
NewModuleRoutes.put('/me/:id', Auth, NewModulesController.upgrade);
NewModuleRoutes.delete('/user/:id', Auth, NewModulesController.delete);
NewModuleRoutes.get('/user', Auth, NewModulesController.list);


export default NewModuleRoutes;