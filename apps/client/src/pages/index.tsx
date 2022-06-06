import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "@mantine/core";

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>Studio</title>
            </Head>
            <div>
                <Container px="xs">...</Container>
            </div>
        </>
    );
};

export default Index;
