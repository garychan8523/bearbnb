import React, { Component } from "react";

class ImageAlbum extends Component {
  constructor() {
    super();
    this.state = { x_axis: 0, activeImage: 0 };
  }

  //transformHandler moves the x_axis left or right. If the func argument is true, move it right, if it is false, move it left.
  transformHandler(leftOrRight) {
    const currentAxis = this.state.x_axis;
    const currentImage = this.state.activeImage;

    if (
      currentAxis < (this.props.data.length - 2) * -160 &&
      leftOrRight === true
    ) {
      this.setState({ x_axis: 0, activeImage: 1 });
    } else if (0 < currentAxis + 160 && leftOrRight === false) {
      this.setState({
        x_axis: (this.props.data.length - 1) * -160,
        activeImage: this.props.data.length
      });
    } else if (leftOrRight === true) {
      this.setState({
        x_axis: currentAxis - 160,
        activeImage: currentImage + 1
      });
    } else if (leftOrRight === false) {
      this.setState({
        x_axis: currentAxis + 160,
        activeImage: currentImage - 1
      });
    }
  }

  render() {
    const transformStyle = { transform: `translateX(${this.state.x_axis}px)` };
    const imageItems = this.props.data.map(listValue => {
      const image = {
        background: `url(${require(`../../stylesheets/assets/homeimages/${listValue}`)})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 50%"
      };
      return <li key={listValue} className="albumImage" style={image} />;
    });
    let curimage = {
      backgroundImage: `url(${require(`../../stylesheets/assets/homeimages/${
        this.props.data[this.state.activeImage]
      }`)})`,
      backgroundSize: "cover",
      backgroundPosition: "50% 50%"
    };

    return (
      <div className="homeImageAlbum albumHide">
        <div className="exitSection">
          <p onClick={this.props.handleClick.bind(this, false)}>X</p>
        </div>

        <div className="albumSection">
          <div
            onClick={this.transformHandler.bind(this, false)}
            className="arrow leftArrow"
          >
            <span
              hidden={this.state.activeImage === 0}
              onClick={this.transformHandler.bind(this, false)}
            >
              Left
            </span>
          </div>

          <div className="imageContainer">
            <div className="currentImage" style={curimage} />

            <div className="imageList">
              <ul style={transformStyle}>{imageItems}</ul>
            </div>
          </div>

          <div
            onClick={this.transformHandler.bind(this, true)}
            className="arrow rightArrow"
          >
            <span
              hidden={this.state.activeImage >= this.props.data.length - 1}
              onClick={this.transformHandler.bind(this, true)}
            >
              Right
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageAlbum;
