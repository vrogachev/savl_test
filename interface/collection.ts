export interface IError {
  error: string;
  type: 'NoSuchRouteError' | 'InvalidSolanaAddressError';
}

export interface ICollections {
  nfts: INFT[];
  blockchain: string;
}

export interface INFT {
  uri: string;
  name: string;
  image: string;
  address: string;
}

export class NFTDto {
  name;
  image;

  constructor(data: INFT) {
    this.name = data?.name;
    this.image = data?.image;
  }
}


