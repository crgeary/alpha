import { Container } from "inversify";
import { SketchService } from "../services/sketch.service";
import { MockSketchService } from "../services/mock/sketch.service";

export const Services = {
    Sketch: Symbol.for("Sketch"),
};

const container = new Container();

container.bind<SketchService>(Services.Sketch).to(MockSketchService);

export { container };
