import React, { Component } from 'react'

export class NewsItem extends Component {
    constructor(){
        super();
    }
  render() {
     let {title, description, imageurl, newsUrl,author, date,source} = this.props;

     
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{left:'90%',zIndex:1}}>{source}</span>
            <img src={imageurl} className="card-img-top" alt="..." height={"286px"} />
            <div className="card-body">
                <h5 className="card-title">{title}  .... </h5>
                <p className="card-text">{description}  ......</p>
                <p class="card-text"><small class="text-muted">By author {author} on {new Date(date).toGMTString()} </small></p>
                <a href={newsUrl} target="_blank"className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
