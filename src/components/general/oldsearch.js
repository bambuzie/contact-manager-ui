import React, { useState, useEffect } from "react";
import axios from "axios";
import Magnifying_Glass from "../../icons/magnifying_glass.png";
import ContactCard from "./ContactCard";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  "B1JJN0FQXD",
  "43e46f3981e262a43fc2a0c433d79b21"
);

// https://www.youtube.com/watch?v=leD2RSJ-AfY
// https://firebase.google.com/docs/reference/js/firebase.database.Query
function Hit(props) {
  return (
    <div>
      <img src={props.hit.image} align="left" alt={props.hit.name} />
      <div className="hit-name">
        <Highlight attribute="name" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={props.hit} />
      </div>
    </div>
  );
}

// Hit.propTypes = {
//   hit: PropTypes.object.isRequired
// };

// const searchClient = algoliasearch(
//   "B1G2GM9NG0",
//   "aadef574be1f9252bb48d4ea09b5cfe5"
// );
const SearchBar = () => {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState("");
  const [uid, setuid] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // console.log(firebase.database().ref("contacts"));
      if (user) {
        setuid(user.uid);
        axios
          .get(
            `https://cors-anywhere.herokuapp.com/https://us-central1-contact-manager-98599.cloudfunctions.net/webAPI/api/v1/users/${user.uid}/contacts/`
          )
          .then(res =>
            setAccounts(
              res.data.map(x => {
                x.data["id"] = x.id;
                return x.data;
              })
            )
          );
      }
    });
  }, []);

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="ais-InstantSearch">
        <h1>React InstantSearch e-commerce demo</h1>
        <InstantSearch indexName="demo_ecommerce" searchClient={searchClient}>
          <div className="left-panel">
            <ClearRefinements />
            <h2>Brands</h2>
            <RefinementList attribute="brand" />
            <Configure hitsPerPage={8} />
          </div>
          <div className="right-panel">
            <SearchBox />
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </InstantSearch>
      </div>
      {/* <InstantSearch indexName="contacts" searchClient={searchClient}>
        <div className="left-panel">
          <ClearRefinements />
          <h2>Brands</h2>
          <RefinementList attribute="brand" />
          <Configure hitsPerPage={8} />
        </div>
        <div className="right-panel">
          <SearchBox />
          <Hits hitComponent={Hit} />
          <Pagination />
        </div>
      </InstantSearch> */}
      {/* <div className="SearchBar" style={styles.searchWrapper}>
        <i style={styles.imageWrapper}>
          <img src={Magnifying_Glass} style={styles.image} />
        </i>
        <input
          style={styles.searchbar}
          value={search}
          placeholder="Search"
          onChange={handleSearch}
        ></input>
      </div>
      <div className="SearchList">
        <SearchList list={accounts} search={search} />
      </div> */}
    </div>
  );
};

const SearchList = ({ list, search }) => {
  const data = list.filter(
    x =>
      (x.name && x.name.toLowerCase().includes(search.toLowerCase())) ||
      (x.phoneNumber && x.phoneNumber.includes(search)) ||
      (x.address && x.address.toLowerCase().includes(search.toLowerCase()))
  );

  return data.map(x => (
    <ContactCard
      key={x.id}
      name={x.name}
      address={x.address}
      phoneNumber={x.phoneNumber}
    />
  ));
};

const styles = {
  searchWrapper: {
    margin: "auto",
    width: "80%"
  },
  searchbar: {
    margin: "auto",
    width: "100%",
    borderRadius: "3px",
    textAlign: "right",
    padding: "5px",
    paddingRight: "15px",
    paddingLeft: "15px"
  },
  imageWrapper: {
    position: "absolute",
    padding: "10px",
    pointerEvents: "none"
  },
  image: {
    width: "7%",
    height: "7%",
    position: "relative",
    bottom: "7px",
    right: "1%"
  }
};

export default SearchBar;