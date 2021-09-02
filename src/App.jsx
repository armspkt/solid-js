import logo from "./logo.svg";
import styles from "./App.module.css";
import { createSignal, createEffect, createResource, lazy } from "solid-js";
import { For } from "solid-js/web";
import { createMutable } from "solid-js/store";
import Currency from "./components/Currency";
import Time from "./components/Time";
import Side from "./components/Side";
import Volume from "./components/Volume";
import PriceTHB from "./components/PriceTHB";
import PercentChange from "./components/PercentChange";
// import { Routes, Route, Link } from "solid-app-router";

// const Users = lazy(() => import("./pages/user"));

const fetcTicker = async (id) =>
  (await fetch(`https://api.bitkub.com/api/market/ticker`)).json();
const fetchSymbol = async (id) =>
  (await fetch(`https://api.bitkub.com/api/market/symbols`)).json();
function App() {
  // const [currentIndex, setCurrentIndex] = createSignal(-1);
  // const [tickerList, setTickerList] = createSignal([]);
  const state = createMutable({
    currentIndex: -1,
    tickerList: [],
  });
  const [tickerData] = createResource(fetcTicker);
  const [symbolData] = createResource(fetchSymbol);

  createEffect(() => {
    if (symbolData()?.result) {
      const webSocketSymbolList = symbolData()
        ?.result?.map((item) => `market.trade.${item.symbol}`)
        .toString()
        .toLowerCase();

      let socket = new WebSocket(
        `wss://api.bitkub.com/websocket-api/${webSocketSymbolList}`
      );

      socket.onopen = function (e) {
        console.info("socket open");
      };

      socket.onmessage = function (event) {
        const messages = event.data.split("\n");
        for (let i = 0; i < messages.length; i++) {
          const message = messages[i];
          const data = JSON.parse(message);
          const symbol = data?.stream?.split(".")?.[2]?.toUpperCase();

          const MAX_LENGTH = 10;
          const nextIndex = (state.currentIndex + 1) % MAX_LENGTH;
          state.currentIndex = nextIndex;
          const percentChange = tickerData()?.[symbol]?.percentChange || 0;
          if (state.tickerList.length === MAX_LENGTH) {
            state.tickerList[nextIndex] = { ...data, percentChange };
          } else {
            state.tickerList.push({ ...data, percentChange });
          }
        }
      };
    }
  });

  // createEffect(() => {
  //   console.log(tickerList());
  //   console.log(currentIndex());
  // });

  return (
    <div class={styles.App}>
      <div class="mt-10 flex justify-center items-center">
        <img src={logo} class={styles.logo} alt="logo" />
        <div class="ml-2 text-3xl">Solid JS</div>
      </div>

      <div class="text-center mt-6">
        <span class="text-rainbow text-2xl font-bold">Bitkub Ticker 🔥</span>
      </div>

      {(tickerData.loading || state.tickerList.length === 0) && (
        <div class="mt-6">Loading...</div>
      )}

      {!tickerData.loading && state.tickerList.length > 0 && (
        <div class="mt-6 mb-10 md:px-32">
          <div class="shadow-lg overflow-auto rounded border-b border-gray-100">
            <table class="min-w-full bg-white">
              <thead class="bg-gray-800">
                <tr>
                  <th class="text-center px-4 py-5 uppercase font-semibold text-sm text-rainbow">
                    Currency
                  </th>
                  <th class="text-center px-4 py-5 uppercase font-semibold text-sm text-rainbow">
                    Time
                  </th>
                  <th class="text-center px-4 py-5 uppercase font-semibold text-sm text-rainbow">
                    Side
                  </th>
                  <th class="text-center px-4 py-5 uppercase font-semibold text-sm w-48 text-rainbow">
                    Volume
                  </th>
                  <th class="text-center px-4 py-5 uppercase font-semibold text-sm w-48 text-rainbow">
                    Price (THB)
                  </th>
                  <th class="text-center px-4 py-5 uppercase font-semibold text-sm text-rainbow">
                    Change (24H)
                  </th>
                </tr>
              </thead>
              <tbody>
                <For each={state.tickerList} fallback={<div>Loading...</div>}>
                  {(item, i) => (
                    <tr
                      class={i() === state.currentIndex ? "bg-[#f7f7f7]" : ""}
                    >
                      <td class="text-center py-3 px-4">
                        <Currency item={item} />
                      </td>
                      <td class="text-center py-3 px-4">
                        <Time item={item} />
                      </td>
                      <td class="text-center py-3 px-4">
                        <Side item={item} />
                      </td>
                      <td class="text-center py-3 px-4">
                        <Volume item={item} />
                      </td>
                      <td class="text-center py-3 px-4">
                        <PriceTHB item={item} />
                      </td>
                      <td class="py-3 px-4">
                        <PercentChange item={item} />
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* <div>
        <Link class="mr-4" href="/">
          Home
        </Link>
        <Link class="nav" href="/users">
          Users
        </Link>
      </div>

      <div>
        <Routes>
          <Route path="/users" element={<Users />} />
        </Routes>
      </div> */}
    </div>
  );
}

export default App;
