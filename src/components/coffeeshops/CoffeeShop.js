import PropTypes from "prop-types";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Avatar";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { editVar } from "../../apollo";
import EditForm from "./EditForm";

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
  position: relative;
  padding: 15px;
`;

const Name = styled.span`
  margin-left: 9px;
  font-weight: 800;
`;

const EditBtn = styled.button`
  border: none;
  position: absolute;
  right: 50px;
  background-color: ${(props) => props.theme.accent};
  font-size: 20px;
  padding: 5px;
  border-radius: 10px;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;
const DelBtn = styled.button`
  border: none;
  position: absolute;
  right: 10px;
  top: 13px;
  font-size: 20px;
  padding: 5px;
  border-radius: 10px;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  margin-top: 20px;
  width: 100%;
`;

const DELETE_COFFEESHOP_MUTATION = gql`
  mutation deleteCoffeeShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
      ok
      error
    }
  }
`;

function CoffeeShop({ id, name, user, categories, photos, isMine }) {
  const clickEdit = useReactiveVar(editVar);
  const history = useHistory();
  const updateDeleteCoffeeShop = (cache, result) => {
    const {
      data: {
        deleteCoffeeShop: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `CoffeeShop:${id}` });
      alert("Successfully Deleted!");
      history.push("/");
    }
  };
  const [deleteCoffeeShop] = useMutation(DELETE_COFFEESHOP_MUTATION, {
    variables: { id },
    update: updateDeleteCoffeeShop,
  });
  const onDelete = () => {
    deleteCoffeeShop();
  };
  return (
    <Content>
      <ContentHeader>
        <Link to={`/users/${user.username}`}>
          <Avatar url={user.avatar} />
        </Link>
        <Link to={`/users/${user.username}`}>
          <Name>{user.username}'s coffee shop</Name>
        </Link>
      </ContentHeader>
      <ContentPhoto>
        {isMine ? (
          <EditBtn onClick={() => (clickEdit ? editVar(false) : editVar(true))}>
            Edit
          </EditBtn>
        ) : null}
        <DelBtn onClick={onDelete}>{isMine ? "❌" : null}</DelBtn>
        <FontAwesomeIcon icon={faCoffee} />
        <Name>{name}</Name>
        {photos?.map((photo) => (
          <Img key={photo.id} src={photo.url} />
        ))}
        <div>Categories: {categories?.map((c) => c.slug + " ")} </div>
        {clickEdit ? <EditForm /> : null}
      </ContentPhoto>
    </Content>
  );
}

CoffeeShop.propTypes = {
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
      id: PropTypes.number,
      name: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

export default CoffeeShop;
