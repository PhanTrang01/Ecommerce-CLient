import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Home() {
  const { user } = useContext(UserContext);
  return <>{user ? <h1>{user.name}</h1> : <h1>hello world</h1>}</>;
}
