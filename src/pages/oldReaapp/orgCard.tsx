// React component for the frontside of the card
import * as React from "react";
import * as themable from "react-themeable";
import * as cardTheme from "./cardStyle.scss";
import {isNullOrUndefined} from "util";

//This method formats the content of the returned from data from the graphql requests
class CardFront extends React.Component {


  render() {
    let org = this.props.card;
    let name = org.name;
    let distance = this.props.distance;
    let type = org.type;
    let org_image = org.image;
    let card_theme = themable(cardTheme);
    let alt_desc = require("../../resources/defaultImage.jpg"); // Way of using images in react it has to be done this way for web pack to recognize it. Doing reacts way does not work, only the webpack specific way works.
    console.log("DEFAULT IMG    "+ alt_desc);
    if(org_image.trim() == "" || org_image.trim().length == 0){ // If no image is returned the default User profile picture is shown. This also occurs if there is an issue displaying the image it displays the default User image
      org_image = alt_desc; // Sets the image to the alternative image
    }
    return(
                <div className="item">
                  <div className="image">
                    <img src={alt_desc}/>
                  </div>
        <div className="content">
          <a className="header">{name}</a>
          <div className="meta">
            <span className="cinema">{"Type: " + type}</span>
          </div>
          <div className="description">
            <p>{isNullOrUndefined(distance) ? "Distance: Not Available" : "Distance: " + distance + " mi."}</p>
          </div>
        </div>

          <div className="extra">
            <div className="ui right floated primary button">
              Connect
              <i className="right chevron icon"></i>
            </div>
          </div>
      </div>

    )
  }
}

export default CardFront;
