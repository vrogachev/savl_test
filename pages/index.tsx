import React from "react";
import Head from 'next/head'
import { useRouter } from "next/router";
import useFetch from "../hooks/useFetch";
import axios, { AxiosError } from "axios";
import Search from "../components/Search/Search";
import { IError, INFT } from "../interface/collection";
import Collections from "../components/Collections/Collections";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";


export default function Home({ address, collections, serverErrors }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [fetchHandler, { data, loading, error }] = useFetch<INFT>({
    url: `http://localhost:3000/api/nft`,
    initialData: collections
  });

  const onSubmitHandler = (value: string) => {
    fetchHandler({ address: value }).then(() => {
      router.push(`/`, { query: { address: value }}, { shallow: true });
    });
  }

  return (
    <>
      <Head>
        <title>NFT-collection</title>
        <meta name="description" content="Search NFT-collection by address" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>

      <main>
        <Search
          defaultValue={address}
          onSubmit={onSubmitHandler}
        />
        <Collections
          data={data}
          loading={loading}
          error={error || serverErrors}
        />
      </main>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query: { address } } = context;

  if (!address) {
    return {
      props: { }
    }
  }

  try {
    const collections = await axios
      .get(`http://localhost:3000/api/nft?address=${address}`)
      .then((res) => res.data.data);

    return {
      props: {
        address,
        collections
      }
    }
  } catch (error) {
    const err = error as AxiosError<IError>;

    return {
      props: {
        address,
        serverErrors: err.response?.data?.error || "error"
      }
    }
  }
}



