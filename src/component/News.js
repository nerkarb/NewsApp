import React, { Component, useEffect, useState } from "react";

import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

import InfiniteScroll from "react-infinite-scroll-component";

import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  //
  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    console.log(url);

    setLoading(true);
    let data = await fetch(url);
    let parseData = await data.json();
    props.setProgress(50);
    console.log(parseData);
    setArticles(parseData.articles);
    setLoading(false);
    setPage();
    setTotalResults(parseData.totalResults);

    props.setProgress(100);
  };
  //useEffect instead of component did mount
  useEffect(() => {
    updateNews();
  }, []);

  //fetch more function
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    console.log(url);
    setPage(page + 1);

    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
    setLoading(false);
  };
  //top bar

  let { category } = props;
  return (
    <div className="container ">
      <h2 className="text-center" style={{ marginTop: "90px" }}>
        <strong>News Monkey </strong>TOP {props.category.toUpperCase()}{" "}
        headlines!!!!
      </h2>
      {/* SPinner component */}
      {loading && <Spinner />}

      {/* //infine scroll */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row my-3">
            {articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 80)
                        : ""
                    }
                    imageurl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propType = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
