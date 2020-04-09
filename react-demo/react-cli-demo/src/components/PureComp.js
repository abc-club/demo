import React, { PureComponent } from 'react';

class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

export default class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar'],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 这部分代码很糟，而且还有 bug
    // const words = this.state.words;
    // words.push('marklar');
    // this.setState({ words: words });

    this.setState({
      words: [...this.state.words, 'marklar'],
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>add</button>
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
