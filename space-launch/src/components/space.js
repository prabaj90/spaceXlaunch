import React, { Component } from 'react';
import axios from 'axios';
import { URL } from './constant';

export default class AppDev extends Component {

  constructor(props) {
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
      .catch(err => { });
  }

  filterByOptions = (key, e) => {
    const { allPosts } = this.state;
    if (key === 'year') {
      const post = allPosts.filter(item =>
        item.launch_year === e.target.innerHTML
      );
      this.setState({ post: post });
    }
    else if (key === 'launch') {
      const post = allPosts.filter(item =>
        item.launch_success === JSON.parse((e.target.innerHTML).toLowerCase())
      );
      this.setState({ post: post });
    }
    else if (key === 'landing') {
      const post = allPosts.filter(item =>
        item.rocket.first_stage.cores[0].land_success === JSON.parse((e.target.innerHTML).toLowerCase())
      );
      this.setState({ post: post });
    }
    else {
      this.setState({ post: allPosts });
    }

  }
  render() {
    return (

      <div className="container-fluid">
        <header>
          <h2>SpaceX Launch Programs</h2>
        </header>

        <section>
          <nav>



            <ul>
              <h1>Filters</h1>
              <p>Launch Year</p>
              <div className="">
                <div className="">
                  <button className="" onClick={(e) => this.filterByOptions('year', e)}>2006</button>
                  <button className="" onClick={(e) => this.filterByOptions('year', e)}>2007</button>

                </div>
              </div>
              <div className="">
                <div className="">
                  <button className="" onClick={(e) => this.filterByOptions('year', e)}>2008</button>
                  <button className="" onClick={(e) => this.filterByOptions('year', e)}>2009</button>

                </div>
              </div>
              <div className="">
                <div className="">
                  <button className="" onClick={(e) => this.filterByOptions('year', e)}>2010</button>
                  <button className="" onClick={(e) => this.filterByOptions('year', e)}>2011</button>

                </div>
              </div>
              <div className="">
                <div className="">
                  <button className="" onClick={(e) => this.filterByOptions('year', e)}>2012</button>
                  <button className="" onClick={(e) => this.filterByOptions('year', e)}>2013</button>

                </div>
              </div>
              <div className="">
                <div className="">
                  <button className="" onClick={(e) => this.filterByOptions('year', e)}>2014</button>
                  <button className="" onClick={(e) => this.filterByOptions('year', e)}>2015</button>

                </div>
              </div>
              <div className="">
                <div className="">
                  <button className="" onClick={(e) => this.filterByOptions('year', e)}>2016</button>
                  <button className="" onClick={(e) => this.filterByOptions('year', e)}>2017</button>

                </div>
              </div>
              <div className="">
                <div className="">
                  <button className="" onClick={(e) => this.filterByOptions('year', e)}>2018</button>
                  <button className="" onClick={(e) => this.filterByOptions('year', e)}>2019</button>

                </div>
              </div>
              <div className="">
                <div className="">
                  <button class="" onClick={() => this.filterByOptions('2020')}>2020</button>


                </div>
              </div>
              <br />
              <p>Successful Launch</p>

              <div className="">
                <div className="">
                  <button className="" onClick={(e) => this.filterByOptions('launch', e)}>True</button>
                  <button className="" onClick={(e) => this.filterByOptions('launch', e)}>False</button>

                </div>
              </div>
              <br />
              <p>Successful Landing</p>

              <div className="">
                <div className="">
                  <button className="" onClick={(e) => this.filterByOptions('landing', e)}>True</button>
                  <button className="" onClick={(e) => this.filterByOptions('landing', e)}>False</button>
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
                    <h3>{item.mission_name}  #{item.flight_number}</h3>
                    <h5>Mission Ids: {item.mission_id.length === 0 ? "0" : item.mission_id.map((id, index) => <span key={index}>{(index ? ', ' : '') + id}</span>)}</h5>
                    <h5>Launch Year: {item.launch_year}</h5>
                    <h5>Successful Launch: {item.launch_success ? "True" : "False"}</h5>
                    <h5>Successful Landing: {item.rocket.first_stage.cores[0].land_success ? "True" : "False"}</h5>
                  </div>
                </li>
              ))}
            </ul>
            <footer>
            <h4> Developed By: </h4>
            <h4> Prabakaran Jayapalan </h4>
            </footer>
          </article>
          

        </section>



      </div>
    );
  }
}
