/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| This file is used for defining the HTTP routes for the application.
| Routes are organized into groups for better structure and clarity.
|
*/

import router from '@adonisjs/core/services/router'

// Import controllers
const ConstructionSitesController = () => import('#controllers/construction_sites_controller')

// API Routes
router
  .group(() => {
    // Health check route
    router.get('/test', () => {
      return { message: 'Hello world' }
    })

    /**
     * Construction Sites Routes
     * CRUD operations for managing construction sites
     */
    router
      .group(() => {
        router.get('/', [ConstructionSitesController, 'index']) // List all construction sites
        router.get('/:id', [ConstructionSitesController, 'show']) // Get a specific construction site
        router.post('/', [ConstructionSitesController, 'store']) // Create a new construction site
        router.put('/:id', [ConstructionSitesController, 'update']) // Update an existing construction site
        router.delete('/:id', [ConstructionSitesController, 'destroy']) // Delete a construction site
      })
      .prefix('/sites') // Prefix for construction sites routes
  })
  .prefix('/api') // Prefix for all API routes
