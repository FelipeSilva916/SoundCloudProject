import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSongs from "./components/AllSongs";
import SongDetail from "./components/SongDetail";
import AllAlbumsComponent from "./components/AllAlbums";
//
//

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const songs = Object.values(useSelector((state) => state.songs));
  const albums = Object.values(useSelector((state) => state.albums));

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/songs">
            <AllSongs />
          </Route>
          <Route exact path="/songs/:songId">
            <SongDetail />
          </Route>
          <Route exact path="/albums">
            <AllAlbumsComponent />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
