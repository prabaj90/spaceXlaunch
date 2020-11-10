import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner'
import { URL, yearWise } from './constant';

export default class AppDev extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: [],
      year: '',
      launchPost: '',
      landingSuccess: '',
      loaderStage: false
    };
  }

  componentDidMount() {
    this.setState({loaderStage: true})
    this.getApi(URL);
  }

  getApi = (URL) => {
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
          loaderStage: false
        });
      })
      .catch(err => { });
  }

  filterByOptions = (key, e) => {
    const { year, launchPost, landingSuccess } = this.state;
    let url = URL;
    if (key === 'year') {
      let year = e.target.innerHTML;
      (typeof (launchPost) === 'boolean' && (launchPost || !launchPost) && typeof (landingSuccess) === 'boolean' && (landingSuccess || !landingSuccess)) ? url = URL + '&launch_success=' + launchPost + '&land_success=' + landingSuccess + '&launch_year=' + year :
        (typeof (launchPost) === 'boolean' && (launchPost || !launchPost)) ? url = URL + '&launch_success=' + launchPost + '&launch_year=' + year :
          (typeof (landingSuccess) === 'boolean' && (landingSuccess || !landingSuccess)) ? url = URL + '&land_success=' + landingSuccess + '&launch_year=' + year :
            url = URL + '&launch_year=' + year;
      this.setState({ year: year })
    }
    else if (key === 'launch') {
      let launchPost = JSON.parse((e.target.innerHTML).toLowerCase());
      (typeof (landingSuccess) === 'boolean' && (landingSuccess || !landingSuccess) && year) ? url = URL + '&launch_success=' + launchPost + '&land_success=' + landingSuccess + '&launch_year=' + year :
        (year) ? url = URL + '&launch_success=' + launchPost + '&launch_year=' + year :
          (typeof (landingSuccess) === 'boolean' && (landingSuccess || !landingSuccess)) ? url = URL + '&land_success=' + landingSuccess + '&launch_success=' + launchPost :
            url = URL + '&launch_success=' + launchPost;
      this.setState({ launchPost: launchPost });
    }
    else if (key === 'landing') {
      let landingSuccess = JSON.parse((e.target.innerHTML).toLowerCase());
      (typeof (launchPost) === 'boolean' && (launchPost || !launchPost) && year) ? url = URL + '&launch_success=' + launchPost + '&land_success=' + landingSuccess + '&launch_year=' + year :
        (year) ? url = URL + '&land_success=' + landingSuccess + '&launch_year=' + year :
          (typeof (launchPost) === 'boolean' && (launchPost || !launchPost)) ? url = URL + '&land_success=' + landingSuccess + '&launch_success=' + launchPost :
            url = URL + '&land_success=' + landingSuccess;
      this.setState({ landingSuccess: landingSuccess });
    }
    this.getApi(url);
  }
  render() {
    const { year, landingSuccess, launchPost, post, loaderStage } = this.state;
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
                    {yearWise.map((item) =>(
                        <button className={year === item ? "selectedButton" : ''} onClick={(e) => this.filterByOptions('year', e)}>{item}</button>
                    ))}
               </div>
              </div>
              <br />
              <p>Successful Launch</p>
              <div className="">
                <div className="">
                  <button className={launchPost === true ? "selectedButton" : ''} onClick={(e) => this.filterByOptions('launch', e)}>True</button>
                  <button className={launchPost === false ? "selectedButton" : ''} onClick={(e) => this.filterByOptions('launch', e)}>False</button>
                </div>
              </div>
              <br />
              <p>Successful Landing</p>
              <div className="">
                <div className="">
                  <button className={landingSuccess === true ? "selectedButton" : ''} onClick={(e) => this.filterByOptions('landing', e)}>True</button>
                  <button className={landingSuccess === false ? "selectedButton" : ''} onClick={(e) => this.filterByOptions('landing', e)}>False</button>
                </div>
              </div>
            </ul>
          </nav>
          {loaderStage ? <div className='loader'><Loader
            type="ThreeDots"
            color="#fff"
            height={400}
            width={400}
          /> </div>: ''}
          <article>
            {post.length <= 0 && !loaderStage ? <div>No Results Found</div> :
              <ul className="data-list">
                {post.map((item, index) => (
                  <li className={"block-" + index}>
                    <div className="title">
                      <img src={item.links.mission_patch_small} />
                      <h3> {item.mission_name}  #{item.flight_number}</h3>
                      <h5>Mission Ids: </h5>
                      <h4> {item.mission_id.length === 0 ? "0" : item.mission_id.map((id, index) => <span key={index}>{(index ? ', ' : '') + id}</span>)}</h4>
                      <h5>Launch Year: </h5>
                      <h4> {item.launch_year}</h4>
                      <h5>Successful Launch: </h5>
                      <h4> {item.launch_success ? "True" : "False"}</h4>
                      <h5>Successful Landing: </h5>
                      <h4> {item.rocket.first_stage.cores[0].land_success ? "True" : (item.rocket.first_stage.cores[0].land_success == false) ? "False" : 'NULL'}</h4>
                    </div>
                  </li>
                ))}
              </ul>
            }
            {post.length > 0 ? <footer>
              <h4> Developed By: </h4>
              <h4> Prabakaran Jayapalan </h4>
            </footer> : ''}
          </article>
        </section>
      </div>
    );
  }
}
