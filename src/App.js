import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/productPage";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";
import PLP from "./pages/PLP";
import FilterMenu from "./components/FilterMenu";
import AllCollections from "./pages/allCollections";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Cart />
        <NavMenu />
        <Switch>
          <Route exact path="/collections">
            <AllCollections/>
          </Route>
          <Route path="/collections/:id">
             <PLP />
          </Route>
          <Route path="/products/:handle">
            <ProductPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
