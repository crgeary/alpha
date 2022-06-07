import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Container, Image, SimpleGrid } from "@mantine/core";
import { container, Services } from "../lib/container";
import { Sketch, SketchService } from "../lib/services/sketch.service";
import Link from "next/link";

type PageProps = {
    sketches: Sketch[];
};

const IndexPage: NextPage<PageProps> = ({ sketches }) => {
    return (
        <>
            <Head>
                <title>Studio</title>
            </Head>
            <div>
                <Container px="xs">
                    <SimpleGrid cols={3}>
                        {sketches.map((sketch, i) => (
                            <div key={i}>
                                <Image
                                    src={sketch.image.url}
                                    alt={sketch.image.description}
                                    radius="sm"
                                />
                                <Link passHref href={`/sketch/${sketch.id}`}>
                                    <a>{sketch.name}</a>
                                </Link>
                            </div>
                        ))}
                    </SimpleGrid>
                </Container>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const sketchService = container.get<SketchService>(Services.Sketch);
    return {
        props: {
            sketches: await sketchService.getSketches(),
        },
    };
};

export default IndexPage;
