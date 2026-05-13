// back/src/routes/index.js
import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { contactController } from '../controllers/contact.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

// Auth routes
router.post('/api/login', authController.login);
router.post('/api/logout', authController.logout);
router.post('/api/usuarios', authController.register);
router.get('/api/auth/me', requireAuth, authController.me);

// Contact routes (protected)
router.get('/api/contatos', requireAuth, contactController.list);
router.post('/api/contatos', requireAuth, contactController.create);
router.put('/api/contatos/:id', requireAuth, contactController.update);
router.delete('/api/contatos/:id', requireAuth, contactController.delete);

export default router;