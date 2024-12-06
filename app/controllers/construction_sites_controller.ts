import type { HttpContext } from '@adonisjs/core/http'
import ConstructionSite from '../models/construction_site_model.js'

export default class ConstructionSitesController {
  index() {
    let constructionSites = ConstructionSite.find()
    return constructionSites
  }

  show({ params }: HttpContext) {
    let constructionSite = ConstructionSite.findById(params.id)
    return constructionSite
  }

  store({ request }: HttpContext) {
    let constructionSite = new ConstructionSite(request.all())
    constructionSite.save()
    return constructionSite
  }

  update({ params, request }: HttpContext) {
    let constructionSite = ConstructionSite.findByIdAndUpdate(params.id, request.all())
    return constructionSite
  }

  destroy({ params }: HttpContext) {
    let constructionSite = ConstructionSite.findByIdAndDelete(params.id)
    return constructionSite
  }
}
