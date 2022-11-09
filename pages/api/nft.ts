import axios, { AxiosError, AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from 'next'
import { IError, ICollections, INFT, NFTDto } from "../../interface/collection";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.query;

  const url = `https://dev.solhall.io/v1/nft/solana/address/${address}`;

  try {
    const walletCollection = await axios
      .get<AxiosResponse<ICollections>>(url)
      .then(({ data: response}) => response.data.nfts);

    const getOneNftByUri = async (nftUri: string) =>
      await axios
        .get<INFT>(nftUri)
        .then(({ data: response}) => new NFTDto(response));

    const queueNftQuery = walletCollection.map(async ({ uri }) =>
      await getOneNftByUri(uri)
    );

    const nftCollection = await Promise.all(queueNftQuery);

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600'
    );

    res.status(200).json({ data: nftCollection });
  } catch (e) {
    const err = e as AxiosError<IError>
    res.status(400).json({
      type: err.response?.data?.type,
      error: err.response?.data?.error
    });
  }
}
