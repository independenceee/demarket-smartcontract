"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import Background from "~/components/Background";
import styles from "./Home.module.scss";
import About from "~/components/About";
import Statistics from "~/components/Statistics";
import Title from "~/components/Title";
import Container from "~/components/Product/Container";
import { get } from "~/utils/http-request";
import { useQuery } from "@tanstack/react-query";

const cx = classNames.bind(styles);

type Props = {};
const Home = function ({}: Props) {
    const [page, setPage] = useState<number>(1);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["Marketplace", page],
        queryFn: () => get(`/marketplaces?page=${page}&pageSize=12`),
    });

    console.log(data);
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <Background />

                <section className={cx("content")}>
                    <Title title={"New Items"} description={"Explore our new products and find your favorites."} />
                    <article className={cx("inner")}>
                        <Container
                            products={data?.products}
                            page={page}
                            loading={isLoading}
                            totalPage={data?.totalPage}
                        />
                    </article>
                </section>

                <section className={cx("content")}>
                    <Title
                        title="Trending Items"
                        description="The trending tech products of 2024. Let's shop now for the hottest products."
                    />
                    <article className={cx("inner")}></article>
                </section>

                <section className={cx("content")}>
                    <Title
                        title="Selling Items"
                        description="Find amazing works from a variety of artists on our platform."
                    />
                    <article className={cx("inner")}>
                        <Container
                            products={data?.products}
                            page={page}
                            loading={isLoading}
                            totalPage={data?.totalPage}
                        />
                    </article>
                </section>

                <section className={cx("content")}>
                    <Title
                        title="Top Accounts"
                        description="Explore our most featured accounts and find the creators, entrepreneurs, and influencers you love."
                    />
                    <article className={cx("inner")}></article>
                </section>

                <Statistics />
                <About />
            </div>
        </main>
    );
};

export default Home;
