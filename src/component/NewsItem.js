import React, { Component } from 'react'

export class NewsItem extends Component {
    constructor(){
        super();
    }
  render() {
     let {title, description, imageurl, newsUrl} = this.props;

     
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
            <img src={imageurl} className="card-img-top" alt="..." height={"286px"} />
            <div className="card-body">
                <h5 className="card-title">{title}  .... </h5>
                <p className="card-text">{description}  ......</p>
                <a href={newsUrl} target="_blank"className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
