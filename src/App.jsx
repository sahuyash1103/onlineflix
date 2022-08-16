import React from "react";
import Row from "./components/row/Row";
import requests from "./services/requests";
import Banner from "./components/banner/Banner";
import Nav from "./components/nav/Nav";
import "./App.css";

function App() {
  return <div className="App">
    <Nav/>

    <Banner />

    <Row title="Onlineflix originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>

    <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
     <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
     <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
     <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
     <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
     <Row title="Romance" fetchUrl={requests.fetchRomanceMovies} />
     <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
  </div>;
}

export default App;
