import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useHistory, useLocation, useParams } from "react-router";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import { Contents } from "../components/auth/Contents";
import { Wrapper } from "../components/auth/Wrapper";
import CoffeeShop from "../components/coffeeshops/CoffeeShop";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";

const SEE_COFFEE_SHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      name
      latitude
      longitude
      photos {
        id
        url
      }
      user {
        id
        username
      }
      categories {
        slug
      }
      isMine
    }
  }
`;

const Notification = styled.p`
  height: 25px;
  padding: 6px 12px;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: #fff;
  background-color: #26cc49;
`;

function Shop() {
  let { id } = useParams();
  id = parseInt(id);
  const location = useLocation();
  const history = useHistory();
  const { data } = useQuery(SEE_COFFEE_SHOP_QUERY, {
    variables: {
      id,
    },
  });
  return (
    <>
      <Header />
      <button onClick={() => logUserOut(history)}>Log out</button>
      <Wrapper>
        <PageTitle title="Coffee Shop | Nomad Coffee" />
        {location?.state?.message ? (
          <Notification>{location?.state?.message}</Notification>
        ) : null}
        <Contents>
          {data?.seeCoffeeShop ? (
            <CoffeeShop id={id} {...data.seeCoffeeShop} />
          ) : null}
        </Contents>
      </Wrapper>
    </>
  );
}

export default Shop;
