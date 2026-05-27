import React, { lazy, Suspense } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
// Lazy load after idle to reduce initial load
const IdleCharacter = () => {
  const [load, setLoad] = React.useState(false);
  React.useEffect(() => {
    const cb = () => setLoad(true);
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(cb);
    } else {
      setTimeout(cb, 2000);
    }
  }, []);
  return load ? <CharacterModel /> : null;
};
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <IdleCharacter />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
