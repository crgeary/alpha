import type { NextPage } from "next";
import Head from "next/head";

type PageProps = {
    // ...
};

const IndexPage: NextPage<PageProps> = () => {
    return (
        <>
            <Head>
                <title>Alpha</title>
            </Head>
            <div>...</div>
        </>
    );
};

export default IndexPage;
