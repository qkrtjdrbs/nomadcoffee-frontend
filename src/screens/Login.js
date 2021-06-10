import { gql, useMutation } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import styled from "styled-components";
import { Wrapper } from "../components/auth/Wrapper";
import PageTitle from "../components/PageTitle";
import { logUserIn } from "../apollo";
import FormError from "../components/auth/FormError";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import { Input } from "../components/auth/Input";
import { TitleHeader } from "../components/auth/TitleHeader";
import FormBox from "../components/auth/FormBox";
import { Button } from "../components/auth/Button";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

const SignUpNotification = styled.p`
  height: 25px;
  padding: 6px 12px;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: #fff;
  background-color: #26cc49;
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 25px;
  margin-bottom: 15px;
`;

const SignUpLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Login() {
  //loading states from sign-up page
  const location = useLocation();
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
    //give a default value by the Input name if previous states exist
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = () => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <Wrapper>
      <PageTitle title="Login | Nomad Coffee" />
      <TitleHeader>
        <Link to={routes.home}>
          <H1>Nomad Coffee</H1>
          <FontAwesomeIcon icon={faCoffee} />
        </Link>
      </TitleHeader>
      <FormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          {location?.state?.message ? (
            <SignUpNotification>{location?.state?.message}</SignUpNotification>
          ) : null}
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
          <Button type="submit" disabled={!formState.isValid || loading}>
            {loading ? "Loading..." : "Log in"}
          </Button>
        </form>
      </FormBox>
      <SignUpLink>
        <Link to={routes.signUp}>✔ Go to Sign Up!</Link>
      </SignUpLink>
    </Wrapper>
  );
}

export default Login;
