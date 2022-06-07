import { injectable } from "inversify";
import { faker } from "@faker-js/faker";
import { SketchService, Sketch } from "../sketch.service";

@injectable()
export class MockSketchService implements SketchService {
    async getSketches() {
        return Array.from({ length: 5 }).map(
            (): Sketch => ({
                id: faker.datatype.uuid(),
                name: faker.music.songName(),
                image: {
                    url: faker.image.abstract(512, 512, true),
                    description: faker.lorem.sentence(),
                },
            }),
        );
    }

    async getSketch(id: string) {
        return {
            id,
            name: faker.music.songName(),
            image: {
                url: faker.image.abstract(512, 512, true),
                description: faker.lorem.sentence(),
            },
        };
    }
}
