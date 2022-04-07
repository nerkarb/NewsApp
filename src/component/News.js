import React, { Component } from 'react'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import NewsItem from './NewsItem'
import Spinner from './Spinner';

import PropTypes from 'prop-types'


export default class News extends Component {
   
    

    static defaultProps={
        country : 'in',
        pageSize : 8,
        category: 'general'
    }
    static propType={
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category: PropTypes.string

    }
    articles = []
    constructor(){
        super();
         
        console.log("I am constructor from news class");
        this.state = {
               // "status": "ok",
                //"totalResults": 3,
                articles: this.articles,
                loading : false,
                page : 1,
                //category : this.props.category
              }        
             

    }

    //component did mout lifwcyle method
    async componentDidMount(){
        console.log("cdm")
        //props from NAvbar
        

        if(this.state.page +1 >Math.ceil( this.state.totalResults/20)){

        }
        else
        {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb011adae2f24349870510899aa351b7&page=1&pageSize=${this.props.pageSize}`;
        console.log(url)
        
        this.setState({loading:true})
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({articles:parseData.articles, 
            totalResults:parseData.totalResults,
            loading:false
        })
        }

    }
    //perivous click
    handlePeriviousClick= async ()=>{
            console.log("per")
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb011adae2f24349870510899aa351b7&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
       
        this.setState({
            page:this.state.page -1,
            articles:parseData.articles,
            loading:false
        })
    }
    //next click
    handleNextClick = async () => {
        console.log("next")

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb011adae2f24349870510899aa351b7&page=${this.state.page +1 }&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        
       
        this.setState({
            page:this.state.page+1,
            articles:parseData.articles,
            loading:false
        })
    }
  render() {
    let {category} = this.props;
    return (
        
      <div className="container my-3">
         <h2 className='text-center'><strong>News Monkey </strong>TOP headlines!!!!</h2> 
        {/* SPinner component */}        
        {this.state.loading && <Spinner />}
         
         <div className="row my-3">
            {this.state.articles.map((element)=>{ 
             return <div className="col-md-4 my-3" key={element.url}>
             <NewsItem  title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} 
             imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
             </div>
             })}
             <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePeriviousClick}> &larr; Perivous</button>
                    <button disabled={this.state.page +1 >Math.ceil( this.state.totalResults/this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
             </div>
         </div>
        
      </div>
    )
  }
}
