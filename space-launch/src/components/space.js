import React, {Component} from 'react';
import axios from 'axios';
import {URL} from './constant';
// import './style.scss';

export default class AppDev extends Component {

    constructor(props){
        super(props);
        this.state = {
            post: [],
            allPosts: []
        };    
    }

	componentDidMount() {
		axios
			.get(URL, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			})
			.then(({ data }) => {
				this.setState({
          post: data,
					allPosts: data // array data from JSON stored in these
				});
			})
			.catch(err => {});
	}

	_onKeyUp = e => {
		// filter post list by title using onKeyUp function
		const post = this.state.allPosts.filter(item =>
			item.mission_name.toLowerCase().includes(e.target.value.toLowerCase())
		);
		this.setState({ post: post });
	};
  
  _filterByYear = year => {
        const post = this.state.allPosts.filter(item =>
            item.launch_year === year
        );
        this.setState({ post: post });
}
_filterByLaunch = launch => {
	const post = this.state.allPosts.filter(item =>
	item.launch_success === launch
	);
	this.setState({ post: post });
    }
    
  _filterByLanding = landing => {
	const post = this.state.allPosts.filter(item =>
	item.rocket.first_stage.cores[0].land_success === landing
	);
	this.setState({ post:post });
	}
  
  
  
	render() {
		return (
      
			<div className="container-fluid">
        <header>
  <h2>Project</h2>
</header>
        <section>
        <nav>
 
          
          
    <ul>
      <h1>Filters</h1>
    <p>Launch Year</p>
        <div className="">
  <div className="">
    <button className=""  onClick={() => this._filterByYear('2006')}>2006</button>
    <button className=""  onClick={() => this._filterByYear('2007')}>2007</button>
    
  </div>
  </div>
  <div className="">
  <div className="">
    <button className=""  onClick={() => this._filterByYear('2008')}>2008</button>
    <button className=""  onClick={() => this._filterByYear('2009')}>2009</button>
    
  </div>
  </div>
  <div className="">
  <div className="">
    <button className=""  onClick={() => this._filterByYear('2010')}>2010</button>
    <button className=""  onClick={() => this._filterByYear('2011')}>2011</button>
    
  </div>
  </div>
  <div className="">
  <div className="">
    <button className=""  onClick={() => this._filterByYear('2012')}>2012</button>
    <button className=""  onClick={() => this._filterByYear('2013')}>2013</button>
    
  </div>
  </div>
  <div className="">
  <div className="">
    <button className=""  onClick={() => this._filterByYear('2014')}>2014</button>
    <button className=""  onClick={() => this._filterByYear('2015')}>2015</button>
    
  </div>
  </div>
  <div className="">
  <div className="">
    <button className=""  onClick={() => this._filterByYear('2016')}>2016</button>
    <button className=""  onClick={() => this._filterByYear('2017')}>2017</button>
    
  </div>
  </div>
  <div className="">
  <div className="">
    <button className=""  onClick={() => this._filterByYear('2018')}>2018</button>
    <button className=""  onClick={() => this._filterByYear('2019')}>2019</button>
    
  </div>
  </div>
  <div className="">
  <div className="">
    <button class=""  onClick={() => this._filterByYear('2020')}>2020</button>
    
    
  </div>
  </div>
      <br/>
  <p>Successful Launch</p>
    
	  <div className="">
  <div className="">
    <button className=""  onClick={() => this._filterByLaunch(true)}>true</button>
  <button className=""  onClick={() => this._filterByLaunch(false)}>false</button>
    
  </div>
  </div>
  <br/>
  <p>Successful Landing</p>
    
	  <div className="">
  <div className="">
     <button className=""  onClick={() => this._filterByLanding(true)}>true</button>
  <button className=""  onClick={() => this._filterByLanding(false)}>false</button>
  </div>
  </div>
    </ul>
  </nav>
          
            
          <article>
   <ul className="data-list">
{/* post items mapped in a list linked to onKeyUp function */}
{this.state.post.map((item, index) => (
<li className={"block-" + index}>
<div className="title">
<img src={item.links.mission_patch_small} />
<h3>{item.mission_name}</h3>
<h5>Mission Ids: {item.mission_id.length === 0 ? "0" : item.mission_id.map((id, index) => <span key={index}>{ (index ? ', ' : '') + id }</span>)}</h5>
<h5>Launch Year: {item.launch_year}</h5>
<h5>Successful Launch: {item.launch_success ? "True" : "False"}</h5>
<h5>Successful Landing: {item.rocket.first_stage.cores[0].land_success ? "True" : "False"}</h5>
</div>
</li>
))}
</ul>
  </article>
            
        </section>
          
				
				
			</div>
		);
	}
}
