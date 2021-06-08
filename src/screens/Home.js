import { useHistory } from "react-router";
import { logUserOut } from "../apollo";
import PageTitle from "../components/PageTitle";

function Home() {
  const history = useHistory();
  return (
    <div>
      <PageTitle title="Home | Nomad Coffee" />
      <h1>HOME</h1>
      <button onClick={() => logUserOut(history)}>Log out</button>
    </div>
  );
}

export default Home;
