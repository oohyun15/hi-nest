import { NotFoundException } from "@nestjs/common";
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

  describe("create()", () => {
    it("should create a movie", () => {
      const beforeCreate = service.index().length;
      service.create({
        title: "Test Movie",
        genres: ["test genre"],
        year: 2021,
      });
      const afterCreate = service.index().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("destroy()", () => {
    it("shoud deletes a movie", () => {
      service.create({
        title: "test",
        genres: ["test"],
        year: 2021,
      });
      const beforeDelete = service.index().length;
      service.destroy(1);
      const afterDelete = service.index().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it("should return a 404", () => {
      try {
        service.destroy(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("update()", () => {
    it("should update a movie", () => {
      service.create({
        title: "TEST",
        genres: ["test"],
        year: 2021,
      });
      service.update(1, { title: "UPDATE TEST" });
      const movie = service.show(1);
      expect(movie.title).toEqual("UPDATE TEST");
    });

    it("should throw a NotFoundException", () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
