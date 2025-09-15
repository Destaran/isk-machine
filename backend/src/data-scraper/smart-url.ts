export class SmartUrl {
  urlBase: string = 'https://esi.evetech.net';
  urlCategory: string;
  urlEntity: string;
  urlOptions: string;

  constructor(urlCategory: string, urlEntity: string, urlOptions: string) {
    this.urlCategory = urlCategory;
    this.urlEntity = urlEntity;
    this.urlOptions = urlOptions;
  }

  getUrlForAll(): string {
    return `${this.urlBase}/${this.urlCategory}/${this.urlEntity}/${this.urlOptions}`;
  }

  getUrlForId(id: number): string {
    return `${this.urlBase}/${this.urlCategory}/${this.urlEntity}/${id}/${this.urlOptions}`;
  }

  getUrlForPage(pageNum: number): string {
    return `${this.urlBase}/${this.urlCategory}/${this.urlEntity}/${this.urlOptions}&page=${pageNum}`;
  }
}
