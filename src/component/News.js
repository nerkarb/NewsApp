import React, { Component } from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

import InfiniteScroll from "react-infinite-scroll-component";



import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  articles = [];
  //capitalize function
  capitalizeFirstLetter = (string) =>{
        return string.charAt(0).tpUpperCase()+ string.slice(1)
  }
  
  constructor(props) {
    super(props);

    console.log("I am constructor from news class");
    this.state = {
      // "status": "ok",
      //"totalResults": 3,
      articles: this.articles,
      loading: true,
      page: 1,
      totalResults: 0
      //category : this.props.category
    };
    //console.log(capitalizeFirstLetter("bhushan"))
    document.title = `${(this.props.category).toUpperCase()} - NewsMonkey`
  }
  //
  async updateNews() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb011adae2f24349870510899aa351b7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    console.log(url);

    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.props.setProgress(50)
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }
  //component did mout lifwcyle method
  async componentDidMount() {
    //     console.log("cdm")
    //    // props from NAvbar

    //     if(this.state.page +1 >Math.ceil( this.state.totalResults/20)){

    //     }
    //     else
    //     {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb011adae2f24349870510899aa351b7&page=1&pageSize=${this.props.pageSize}`;
    //     console.log(url)

    //     this.setState({loading:true})
    //     let data = await fetch(url);
    //     let parseData = await data.json();
    //     console.log(parseData);
    //     this.setState({articles:parseData.articles,
    //         totalResults:parseData.totalResults,
    //         loading:false
    //     })
    //     }
    this.updateNews();
  }
  //perivous click
  handlePeriviousClick = async () => {
    //     console.log("per")
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb011adae2f24349870510899aa351b7&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading:true})
    //     let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);

    // this.setState({
    //     page:this.state.page -1,
    //     articles:parseData.articles,
    //     loading:false
    // })
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  //next click
  handleNextClick = async () => {
    console.log("next");

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb011adae2f24349870510899aa351b7&page=${this.state.page +1 }&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);

    // this.setState({
    //     page:this.state.page+1,
    //     articles:parseData.articles,
    //     loading:false
    // })
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  //fetch more function
  fetchMoreData = async () => {
    
   this.setState({page:this.state.page +1 })
   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb011adae2f24349870510899aa351b7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
   console.log(url);

  
   let data = await fetch(url);
   let parseData = await data.json();
   console.log(parseData);
   this.setState({
     articles: this.state.articles.concat(parseData.articles),
     totalResults: parseData.totalResults,
     loading: false,
   });
 
   
  };
  //top bar
 
  render() {
    let { category } = this.props;
    return (
      <div className="container my-3">
        <h2 className="text-center">
          <strong>News Monkey </strong>TOP {(this.props.category).toUpperCase()} headlines!!!!
        </h2>
        {/* SPinner component */}
        {this.state.loading && <Spinner />}

        {/* //infine scroll */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
        <div className="container">
        <div className="row my-3">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-3" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 40) : ""}
                  description={
                    element.description ? element.description.slice(0, 80) : ""
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
          {/* <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              class="btn btn-dark"
              onClick={this.handlePeriviousClick}
            >
              {" "}
              &larr; Perivous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              class="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div> */}
        </div>
        
      
    );
  }
}
