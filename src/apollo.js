import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const TOKEN = "token";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
export const editVar = makeVar(false);
export const uploadVar = makeVar(false);

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const logUserOut = (history) => {
  localStorage.removeItem(TOKEN);
  //kill all previous states
  if (history) {
    history.replace();
  }
  window.location.reload();
};

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};
export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE, "enabled");
  darkModeVar(false);
};

//for file uploading
const uploadLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://nomadcoffee-backend-psk.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
});

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://nomadcoffee-backend-psk.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
});

//send token to http headers
const authLink = setContext((_, { headers }) => {
  return {
    //new headers
    headers: {
      ...headers, //previous headers
      token: localStorage.getItem(TOKEN), // plus token
    },
  };
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink, uploadLink]),
  cache: new InMemoryCache({
    //The way of saving on cache.
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
    },
  }),
});
