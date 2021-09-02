import { createSignal, onCleanup } from "solid-js";

function User() {
  const [count, setCount] = createSignal(0),
    timer = setInterval(() => setCount(count() + 1), 1000);
  onCleanup(() => clearInterval(timer));

  return (
    <>
      <div>User Page</div>
      <div>{count}</div>
    </>
  );
}

export default User;
