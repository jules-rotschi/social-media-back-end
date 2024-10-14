import { UrlRepository } from "#contracts/repositories/url_repository";
import router from "@adonisjs/core/services/router";

export class AdonisUrlRepository implements UrlRepository {
  getSignedUrl(url: string, params: any[], routeIdentifier: string, expiresIn: string | number) {
    return router
      .builder()
      .prefixUrl(url)
      .params(params)
      .makeSigned(routeIdentifier, { expiresIn });
  }
}