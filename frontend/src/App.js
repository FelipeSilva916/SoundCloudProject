import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSongs from "./components/AllSongs";
import SongDetail from "./components/SongDetail";
import AllAlbumsComponent from "./components/AllAlbums";
import AlbumDetailComponent from "./components/AlbumDetailComponent";
import Welcome from "./components/Navigation/Welcome";
import PageNotFound from "./components/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const albums = Object.values(useSelector((state) => state.albums));

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>

          <Route exact path="/songs">
            <AllSongs />
          </Route>

          <Route path="/songs/:songId">
            <SongDetail />
          </Route>

          <Route exact path="/albums">
            <AllAlbumsComponent />
          </Route>

          <Route path="/albums/:albumId">
            <AlbumDetailComponent albums={albums} />
          </Route>

          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
