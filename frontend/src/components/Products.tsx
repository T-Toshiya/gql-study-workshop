import { gql, useQuery } from "@apollo/client";
import {
  ProductsQuery,
  ProductsQueryVariables,
} from "./__generated__/products-query";

const query = gql`
  query ProductsQuery {
    products {
      id
      name
    }
  }
`;

export default function Products() {
  const { data, loading } = useQuery<ProductsQuery, ProductsQueryVariables>(
    query
  );
  if (loading || !data) return null;
  return (
    <>
      <ul>
        {data.products.map((product: { id: string; name: string }) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </>
  );
}
