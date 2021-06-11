import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Wrapper } from "../components/auth/Wrapper";
import PageTitle from "../components/PageTitle";
import FormError from "../components/auth/FormError";
import { Input } from "../components/auth/Input";
import { TitleHeader } from "../components/auth/TitleHeader";
import FormBox from "../components/auth/FormBox";
import { Button } from "../components/auth/Button";
import { isLoggedInVar, uploadVar } from "../apollo";
import Login from "./Login";
import { useHistory } from "react-router";
import { routes } from "../routes";
import { Link } from "react-router-dom";
import { useState } from "react";

const CREATE_COFFEESHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $files: [Upload]
    $categories: [String]
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      files: $files
      categories: $categories
    ) {
      id
      name
    }
  }
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 25px;
  margin-bottom: 15px;
`;

const Img = styled.img`
  width: 100%;
`;

function Add() {
  const history = useHistory();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    setError,
    getValues,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });
  const onCompleted = (data) => {
    const {
      createCoffeeShop: { id, name },
    } = data;
    if (!name) {
      return setError("result", {
        message: "Fail to create coffee shop.",
      });
    }
    history.push(`shop/${id}`, {
      message: "New shop is added!",
    });
  };
  const [createCoffeeShop, { loading }] = useMutation(
    CREATE_COFFEESHOP_MUTATION,
    {
      onCompleted,
    }
  );
  const getMyLocation = () => {
    let longitude = null,
      latitude = null;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        alert(`Your location is ${latitude}, ${longitude}`);
        return { latitude, longitude };
      },
      () => {
        return setError("result", {
          message: "Please agree to approach the location.",
        });
      }
    );
  };

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        latitude = String(latitude);
        longitude = String(longitude);
        let { name, categories, photo } = getValues();
        console.log(photo);
        categories = categories.split(",");
        createCoffeeShop({
          variables: {
            name,
            latitude,
            longitude,
            categories,
            files: photo,
          },
        });
      },
      () => {
        return setError("result", {
          message: "Please agree to approach the location.",
        });
      }
    );
  };
  const clearLoginError = () => {
    clearErrors("result");
  };

  const [preview, setPreview] = useState(null);
  const isUploaded = useReactiveVar(uploadVar);
  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
      uploadVar(true);
    };
  };
  return isLoggedIn ? (
    <Wrapper>
      <PageTitle title="Add Coffee Shop | Nomad Coffee" />
      <TitleHeader>
        <Link to={routes.home}>
          <H1>Nomad Coffee</H1>
          <FontAwesomeIcon icon={faCoffee} />
        </Link>
      </TitleHeader>
      <FormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <FormError message={errors?.name?.message} />
          <FormError message={errors?.location?.message} />
          <FormError message={errors?.result?.message} />
          <Input
            {...register("name", {
              required: "Name is required",
            })}
            onFocus={clearLoginError}
            type="text"
            placeholder="Coffee shop name"
            hasError={Boolean(errors?.name?.message)}
          />
          <Input
            {...register("categories")}
            onFocus={clearLoginError}
            type="text"
            placeholder="Categories"
            hasError={Boolean(errors?.categories?.message)}
          />
          <Input
            {...register("photo")}
            onFocus={clearLoginError}
            type="file"
            multiple
            onChange={onUpload}
          />
          {isUploaded ? <Img alt="preview" src={preview} /> : null}
          <Button type="submit" disabled={!formState.isValid || loading}>
            {loading ? "Loading..." : "Create Coffee Shop"}
          </Button>
        </form>
        <Button onClick={getMyLocation}>
          {loading ? "Loading..." : "Get my location (required)"}
        </Button>
      </FormBox>
    </Wrapper>
  ) : (
    <Login />
  );
}

export default Add;
