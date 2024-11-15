import { router } from './init';
import { authenticationRouter } from './routers/authentication-router';

export const authRouter = router({
  auth: authenticationRouter,
});
export type AuthRouter = typeof authRouter;
