import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useHistory } from "react-router";
import { logUserOut } from "../apollo";
import { Contents } from "../components/auth/Contents";
import { Wrapper } from "../components/auth/Wrapper";
import CoffeeShops from "../components/coffeeshops/Coffeeshops";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";

const SEE_COFFEE_SHOPS_QUERY = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      id
      name
      latitude
      longitude
      user {
        id
        username
      }
      photos {
        id
        url
      }
      categories {
        id
        name
        slug
      }
    }
  }
`;

function Home() {
  const history = useHistory();
  const { data } = useQuery(SEE_COFFEE_SHOPS_QUERY, {
    fetchPolicy: "no-cache",
    variables: {
      offset: 4,
    },
  });
  return (
    <>
      <Header />
      <button onClick={() => logUserOut(history)}>Log out</button>
      <Wrapper>
        <PageTitle title="Home | Nomad Coffee" />
        <Contents>
          {data?.seeCoffeeShops?.map((coffeeShop) => (
            <CoffeeShops key={coffeeShop.id} {...coffeeShop} />
          ))}
        </Contents>
      </Wrapper>
    </>
  );
}

export default Home;
