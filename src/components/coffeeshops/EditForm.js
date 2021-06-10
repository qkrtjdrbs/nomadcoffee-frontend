import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Wrapper } from "../auth/Wrapper";
import FormError from "../auth/FormError";
import { Input } from "../auth/Input";
import FormBox from "../auth/FormBox";
import { Button } from "../auth/Button";
import { useParams } from "react-router";

const EDIT_COFFEESHOP_MUTATION = gql`
  mutation editCoffeeShop($id: Int!, $name: String, $categories: [String]) {
    editCoffeeShop(id: $id, name: $name, categories: $categories) {
      ok
      error
    }
  }
`;

function EditForm() {
  let { id } = useParams();
  id = parseInt(id);
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
      editCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    window.location.reload();
  };
  const [editCoffeeShop, { loading }] = useMutation(EDIT_COFFEESHOP_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    let { name, categories } = getValues();
    categories = categories.split(",");
    if (categories[0] === "") {
      categories = null;
    }
    editCoffeeShop({
      variables: {
        id,
        ...(name.length && { name }),
        ...(categories && { categories }),
      },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <Wrapper>
      <FormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <FormError message={errors?.result?.message} />
          <Input
            {...register("name")}
            onFocus={clearLoginError}
            type="text"
            placeholder="Name"
            hasError={Boolean(errors?.name?.message)}
          />
          <Input
            {...register("categories")}
            onFocus={clearLoginError}
            type="text"
            placeholder="Categories"
            hasError={Boolean(errors?.categories?.message)}
          />
          <Button type="submit" disabled={!formState.isValid || loading}>
            {loading ? "Loading..." : "Complete"}
          </Button>
        </form>
      </FormBox>
    </Wrapper>
  );
}

export default EditForm;
