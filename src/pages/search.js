import React from "react"
import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  SearchBox,
  Hits,
  HitsPerPage,connectStateResults
} from "react-instantsearch-dom"

import SEO from "../components/seo"
import Layout from "../components/layout"
import SearchPost from "../components/search"

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
)

const Result = connectStateResults(({ searchState, searchResults, children }) =>
  searchState && searchState.query
  ? searchResults && searchResults.nbHits !== 0
      ? children
      : <div>
         {searchState.query
            ? "No results have been found for \"" + searchState.query + "\""
            : "Wow, such empty."
          }.
        </div>
  : "Wow, such empty."
)

const Search = () => {
  return (
    <>
      <SEO title={`Search`} description={`Search`} />
      <Layout>
        <InstantSearch searchClient={searchClient} indexName="Post">
          <div className="infoBanner">
            <SearchBox translations={{ placeholder: "Search here..." }} />
          </div>
          <Result>
            <Hits hitComponent={SearchPost} />
          </Result>
          <HitsPerPage
            defaultRefinement={5}
            items={[
              { value: 5, label: "Showing 05 hits" },
              { value: 10, label: "Showing 10 hits" },
              { value: 20, label: "Showing 20 hits" },
              { value: 50, label: "Showing 50 hits" }
            ]}
          />
        </InstantSearch>
      </Layout>
    </>
  )
}

export default Search
