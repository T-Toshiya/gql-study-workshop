import { useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";

import {
  ProductDetailQuery,
  ProductDetailQueryVariables,
} from "./__generated__/product-detail-query";

import {
  AddReviewMutation,
  AddReviewMutationVariables,
} from "./__generated__/add-review-mutation";

import ProductReview, { productReviewFragment } from "./ProductReview";

const query = gql`
  query ProductDetailQuery($id: ID!) {
    product(id: $id) {
      id
      name
      description
      ...ProductReviewFragment
    }
  }
  ${productReviewFragment}
`;

const mutation = gql`
  mutation AddReviewMutation($pid: ID!, $comment: String!) {
    addReview(
      productId: $pid
      addReviewInput: { commentBody: $comment, star: 0 }
    ) {
      id
    }
  }
`;

export default function ProductDetail() {
  const { productId } = useParams<{ readonly productId: string }>();
  const { data, loading, refetch } = useQuery<
    ProductDetailQuery,
    ProductDetailQueryVariables
  >(query, {
    variables: {
      id: productId,
    },
  });
  const [addReview, { loading: submitting }] = useMutation<
    AddReviewMutation,
    AddReviewMutationVariables
  >(mutation, {
    update(_, { data }) {
      if (!data?.addReview) return;
      refetch();
    },
  });
  if (loading) return <div>loading...</div>;
  if (!data?.product) return <div>not found </div>;
  const { product } = data;
  return (
    <>
      <h1>{product.name}</h1>
      <p style={{ whiteSpace: "pre-wrap" }}>{product.description}</p>
      <div>
        <h2>レビュー</h2>
        <ProductReview
          product={product}
          onSubmit={(comment) =>
            addReview({ variables: { pid: productId, comment } })
          }
          submitting={submitting}
        />
      </div>
    </>
  );
}
