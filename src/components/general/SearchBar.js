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

// https://www.youtube.com/watch?v=leD2RSJ-AfY
// https://firebase.google.com/docs/reference/js/firebase.database.Query
const Hit = props => {
  console.log(props.hit);
  return (
    <div>
      <ContactCard
        key={props.hit.id}
        name={props.hit.name}
        address={props.hit.address}
        phoneNumber={props.hit.phoneNumber ? props.hit.phoneNumber : "555"}
      />
    </div>
  );
};

const searchClient = algoliasearch(
  "B1JJN0FQXD",
  "43e46f3981e262a43fc2a0c433d79b21"
);

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

  return (
    <div>
      <div className="ais-InstantSearch">
        <InstantSearch indexName="contacts" searchClient={searchClient}>
          {/* <div className="left-panel">
            <ClearRefinements />
            <h2>Brands</h2>
            <RefinementList attribute="brand" />
            <Configure hitsPerPage={8} />
          </div> */}
          <div className="right-panel">
            <SearchBox />
            <Hits hitComponent={Hit} />
            {/* <Pagination /> */}
          </div>
        </InstantSearch>
      </div>
    </div>
  );
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
