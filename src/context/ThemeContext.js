import React, { Component, createContext } from 'react';
import { LIGHT, DARK } from '../constants';

const Context = createContext();

export default class ThemeContext extends Component {
  static Consumer = Context.Consumer;

  toggleTheme() {
    this.setState({
      themeType: this.state.themeType === DARK ? LIGHT : DARK
    });
  };

  state = {
    themeType: 'light',
    toggleTheme: this.toggleTheme.bind(this)
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}