/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')

router.post('/register', [AuthController, 'register'])

// API routes
router
  .group(() => {
    router.get('/test', () => {
      return { message: 'Hello world' }
    })
  })
  .prefix('/api')
