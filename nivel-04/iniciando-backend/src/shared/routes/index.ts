import { Router } from 'express';
import appointmentsRouter from '../modules/appointments/routes/appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import ensureAuthenticated from '../shared/middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/appointments', ensureAuthenticated, appointmentsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

export default routes;
