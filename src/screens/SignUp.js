import { gql, useMutation } from "@apollo/client";
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
import { useHistory } from "react-router";
import { routes } from "../routes";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $name: String!
    $location: String!
    $password: String!
    $avatarURL: String
    $githubUsername: String
  ) {
    createAccount(
      username: $username
      password: $password
      email: $email
      name: $name
      location: $location
      avatarURL: $avatarURL
      githubUsername: $githubUsername
    ) {
      ok
      error
    }
  }
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 25px;
  margin-bottom: 15px;
`;

function SignUp() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });
  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    const { username, password } = getValues();
    history.push(routes.home, {
      message: "Account created. please log in.",
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <Wrapper>
      <PageTitle title="Sign Up | Nomad Coffee" />
      <TitleHeader>
        <H1>Nomad Coffee</H1>
        <FontAwesomeIcon icon={faCoffee} />
      </TitleHeader>
      <FormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <FormError message={errors?.username?.message} />
          <FormError message={errors?.password?.message} />
          <FormError message={errors?.name?.message} />
          <FormError message={errors?.location?.message} />
          <FormError message={errors?.result?.message} />
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 4,
                message: "Username should be longer than 4 chars",
              },
            })}
            onFocus={clearLoginError}
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <Input
            {...register("email", {
              required: "Email is required.",
            })}
            onFocus={clearLoginError}
            type="email"
            placeholder="Email"
            hasError={Boolean(errors?.email?.message)}
          />
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "Password should be longer than 5 chars",
              },
            })}
            onFocus={clearLoginError}
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <Input
            {...register("name", {
              required: "name is required",
            })}
            onFocus={clearLoginError}
            type="text"
            placeholder="Name"
            hasError={Boolean(errors?.name?.message)}
          />
          <Input
            {...register("location", {
              required: "Location is required",
            })}
            onFocus={clearLoginError}
            type="text"
            placeholder="Location"
            hasError={Boolean(errors?.location?.message)}
          />
          <Input
            {...register("githubUsername")}
            onFocus={clearLoginError}
            type="text"
            placeholder="Github Username"
            hasError={Boolean(errors?.githubUsername?.message)}
          />
          <Button type="submit" disabled={!formState.isValid || loading}>
            {loading ? "Loading..." : "Sign Up"}
          </Button>
        </form>
      </FormBox>
    </Wrapper>
  );
}

export default SignUp;
