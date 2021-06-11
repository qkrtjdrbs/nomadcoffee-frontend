import PropTypes from "prop-types";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Avatar";

const Content = styled.div`
  box-sizing: border-box;
  border: 1px solid black;
  margin-bottom: 20px;
`;

const ContentHeader = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid black;
  padding: 15px;
  display: flex;
  align-items: center;
`;

const ContentPhoto = styled.div`
  padding: 15px;
`;

const Name = styled.span`
  margin-left: 9px;
  font-weight: 800;
`;

const PhotoFile = styled.img`
  width: 100%;
`;

const Photo = styled.div`
  margin: 10px;
`;

function CoffeeShops({ id, name, user, photos, categories }) {
  return (
    <Content key={id}>
      <ContentHeader>
        <Link to={`/users/${user.username}`}>
          <Avatar url={user.avatar} />
        </Link>
        <Link to={`/users/${user.username}`}>
          <Name>{user.username}</Name>
        </Link>
      </ContentHeader>
      <ContentPhoto>
        <Link to={`/shop/${id}`}>
          <FontAwesomeIcon icon={faCoffee} />
          <Name>{name}</Name>
        </Link>
        <Photo>
          {photos?.map((photo) => (
            <PhotoFile key={photo.id} src={photo.url} />
          ))}
          Categories: {categories?.map((c) => c.slug + " ")}{" "}
        </Photo>
      </ContentPhoto>
    </Content>
  );
}

CoffeeShops.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  user: PropTypes.shape({
    avatarURL: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ),
};

export default CoffeeShops;
