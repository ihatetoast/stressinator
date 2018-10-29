import React, { Component } from 'react';
import Intro from './Dumb/Intro';

import { addStressor, deleteStressor, clearStressors } from './../actions';

//connect this component to the store:
// // hooks two fcns to react comp. mapStateToProp mapDispatchToProps
import { connect } from 'react-redux';
import moment from 'moment';

class Stressinator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dateDue: ''
    };
  }

  handleClick = () => {
    this.addStressor();
    this.refs.inputField.value = '';
  };
  // note what's in props: addStressor. It takes text as argument, so pass in this.state.text
  addStressor() {
    this.props.addStressor(this.state.text, this.state.dateDue);
  }
  deleteStressor(id) {
    this.props.deleteStressor(id);
  }
  clearStressors() {
    this.props.clearStressors();
  }
  renderStressors() {
    const { stressors } = this.props;
    return (
      <ul className="list">
        {/* reminder: if you ever want to render the same thing with diff content, it'll probably need map. one component for all the elem in the arr  */}
        {stressors.map(stressor => {
          //stressor is an object. so stresser.id, stresser.text
          return (
            <li key={stressor.id} className="li">
              <div className="listItem">
                <div className="listItem-text">Stressor "{stressor.text}"</div>
                <div className="listItem-date">
                  {' '}
                  is due to attack{' '}
                  {moment(new Date(stressor.dateDue)).fromNow()}!
                </div>
              </div>

              <div
                className="listItem delBtn"
                onClick={() => this.deleteStressor(stressor.id)}
              >
                <span role="img" aria-label="delete">
                  &#x274C;
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
  render() {
    // console.log('this.props in render fcn: ', this.props);
    return (
      <div className="container">
        <Intro />
        <div className="form">
          <div className="form-group">
            <input
              type="text"
              ref="inputField"
              className="input"
              placeholder="..."
              onChange={e => this.setState({ text: e.target.value })}
            />
            <input
              type="datetime-local"
              className="input"
              onChange={e => this.setState({ dateDue: e.target.value })}
            />

            <button
              type="button"
              className="btn-submit"
              onClick={this.handleClick}
            >
              Deploy Stressor
            </button>
            {this.renderStressors()}
            <div className="clearAll">
              <p>
                Overwhelmed by the invasion of stressors? Hit the red button to
                wipe them out, but be warned! Wiping out all of the stressors
                and giving up might only cause you further stress down the road.
                Because they never truly die.
              </p>
              <button
                type="button"
                className="btn-clear"
                onClick={() => this.clearStressors()}
              >
                Kablam
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//arguments for connect fcn. first arg is mapStateToProps
function mapStateToProps(state) {
  // console.log('state in map state to props:', state);
  // state looks like what we want our stressors to be,
  return {
    stressors: state
  };
}

// second is mapDispatchToProps
//bind acton creator to this application
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ addStressor }, dispatch);
// }
//connect it to the component:
// // connect(mapStateToProps, mapDispatchToProps)(ComponentThatHoldsState)
export default connect(
  mapStateToProps,
  { addStressor, deleteStressor, clearStressors }
)(Stressinator);
