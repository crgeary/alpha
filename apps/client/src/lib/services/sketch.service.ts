export type Sketch = {
    id: string;
    name: string;
    image: {
        url: string;
        description: string;
    };
};

export type SketchService = {
    getSketches(): Promise<Sketch[]>;
    getSketch(id: string): Promise<Sketch>;
};
