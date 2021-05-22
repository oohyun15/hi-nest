import { Test, TestingModule } from "@nestjs/testing";
import { MoviesService } from "./movies.service"

describe("MoviesService", () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("index()", () => {
    it("should return an array", () => {
      const result = service.index();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("show()", () => {
    it("should return a movie", () => {
      service.create({
        title: "Test Movie",
        genres: ["test genre"],
        year: 2021,
      });

      const movie = service.show(1);
      expect(movie).toBeDefined();
      expect(movie.title).toEqual("Test Movie");
      expect(movie.genres).toContain("test genre");
      expect(movie.year).toEqual(2021);
    });
  });
});
