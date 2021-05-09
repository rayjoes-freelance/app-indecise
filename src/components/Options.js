import React from 'react';
import Option from './Option.js';

const Options = (props) =>  { 
    return (
    <div>
        <div className="widget-header">
        <h3 className="widget-header__title">Your options</h3>
        <button 
        className="button--link"
        onClick={props.handleDeleteOptions}>
        Remove all
        </button>
        </div>
        {props.options.Length ==0 && <p className="widget__message">Please add option to get started</p>}
        {
            props.options.map((option, index) => (
              <div>
              <Option
              key={option}
              optionText={option}
              count={index+1}
              handleDeleteOption={props.handleDeleteOption}
              />
              </div>
            ))
          }
      </div>
    );
}

export default Options;