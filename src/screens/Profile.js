import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useParams } from "react-router";
import styled from "styled-components";
import { FatText } from "../components/shared";
import { Button } from "../components/auth/Button";
import PageTitle from "../components/PageTitle";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      avatarURL
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
`;

const Container = styled.div`
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;

const ProfileBtn = styled(Button).attrs({
  as: "span",
})`
  margin-left: 10px;
  margin-top: 0px;
`;

function Profile() {
  const { username } = useParams();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
    fetchPolicy: "no-cache",
  });
  const getButton = (seeProfile) => {
    const { isMe } = seeProfile;
    if (isMe) {
      return <ProfileBtn>Edit Profile</ProfileBtn>;
    }
  };
  return (
    <Container>
      <PageTitle
        title={loading ? "Loading..." : `${username}'s Profile`}
      ></PageTitle>
      <Header>
        <Avatar src={data?.seeProfile?.avatarURL} />
        <Column>
          <Row>
            <Username>{username}</Username>
            {data?.seeProfile ? getButton(data.seeProfile) : null}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
        </Column>
      </Header>
    </Container>
  );
}

export default Profile;
