import { gql } from "@apollo/client";
import { useState } from "react";
import { ProductReviewFragment } from "./__generated__/product-review-fragment";

type Props = {
  product: ProductReviewFragment;
  submitting: boolean;
  onSubmit: (comment: string) => Promise<any>;
};

export const productReviewFragment = gql`
  fragment ProductReviewFragment on Product {
    reviews {
      id
      commentBody
    }
  }
`;

export default function ProductReview({
  product,
  submitting,
  onSubmit,
}: Props) {
  const [myComment, setMyComment] = useState("");
  if (!product) return null;
  return (
    <>
      {product.reviews.length ? (
        <ul>
          {product.reviews.map((r) => (
            <li key={r.id}>{r.commentBody}</li>
          ))}
        </ul>
      ) : (
        <p>レビューはまだありません</p>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await onSubmit(myComment);
          setMyComment("");
        }}
      >
        <div>
          <label>
            コメント
            <textarea
              value={myComment}
              onChange={(e) => setMyComment(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" disabled={submitting}>
          追加
        </button>
      </form>
    </>
  );
}
