import React, { FC } from "react";
import Items from "../Items/Items";
import Error from "../Error/Error";
import { INFT } from "../../interface/collection";
import SkeletonContainer from "../SkeletonContainer/SkeletonContainer";

interface CollectionsProps {
  loading: boolean;
  data: INFT[] | null;
  error: string | null;
}

const Collections:FC<CollectionsProps> = ({ data, loading, error }) => {
  if (loading) return <SkeletonContainer />;
  if (error) return <Error error={error} />;
  if (data && !loading) return <Items collections={data} />;

  return null;
}

export default Collections;
