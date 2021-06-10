import { useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import { routes } from "../routes";
import Avatar from "./Avatar";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 360px;
  height: 63px;
  color: ${(props) => props.theme.fontColor};
  line-height: 1;
  border-bottom: 1px solid #dde1e5;
  background-color: #fff;
  z-index: 9999999;
`;

const SHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 10px;
  border: 0;
  font-size: 100%;
  border-radius: 0;
  box-sizing: border-box;
`;

const Column = styled.div`
  font-size: 25px;
`;

const Span = styled.span`
  font-weight: 600;
  font-size: 30px;
`;

const Button = styled.div`
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  padding: 5px 10px;
  color: black;
  font-size: 22px;
  color: white;
  background-color: ${(props) => props.theme.accent};
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  return (
    <Wrapper>
      <SHeader>
        <Column>
          {isLoggedIn ? (
            <Link to={routes.add}>
              <Button>Add</Button>
            </Link>
          ) : null}
        </Column>

        <Link to={routes.home}>
          <Span>Nomad Coffee</Span>
        </Link>

        <Column>
          {isLoggedIn ? (
            <Link to={`/users/${data?.me?.username}`}>
              <Avatar url={data?.me?.avatarURL} />
            </Link>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </SHeader>
    </Wrapper>
  );
}

export default Header;
