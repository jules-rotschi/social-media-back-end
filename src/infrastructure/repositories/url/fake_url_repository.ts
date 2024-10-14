import { UrlRepository } from "#contracts/repositories/url_repository";

export class FakeUrlRepository implements UrlRepository {
  getSignedUrl(url: string) {
    return `${url}/fake-url`;
  }
}