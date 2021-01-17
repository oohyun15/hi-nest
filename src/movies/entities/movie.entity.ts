export class Movie {
  "id": number;
  "title": string;
  "year": number;
  "gernes": string[];

  constructor(id: number, title: string, year: number, gernes: string[]) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.gernes = gernes;
  }
}