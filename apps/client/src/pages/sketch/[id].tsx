import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Container, Image } from "@mantine/core";
import { container, Services } from "../../lib/container";
import { Sketch, SketchService } from "../../lib/services/sketch.service";

type PageProps = {
    sketch: Sketch;
};

type PageQuery = {
    id: string;
};

const SketchPage: NextPage<PageProps> = ({ sketch }) => {
    return (
        <>
            <Head>
                <title>{sketch.name} | Studio</title>
            </Head>
            <div>
                <Container px="xs">
                    <h1>{sketch.name}</h1>
                    <Image src={sketch.image.url} alt={sketch.image.description} radius="sm" />
                </Container>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<PageProps, PageQuery> = async (context) => {
    const sketchService = container.get<SketchService>(Services.Sketch);
    return {
        props: {
            sketch: await sketchService.getSketch(`${context.params!.id}`),
        },
    };
};

export default SketchPage;
