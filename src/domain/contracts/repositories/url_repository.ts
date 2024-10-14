export abstract class UrlRepository {
  abstract getSignedUrl(url: string, params: any[], routeIdentifier: string, expiresIn: string | number): string;
}