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
    if(org_image.trim() == "" || org_image.trim().length == 0){ // If no image is returned the default user profile picture is shown. This also occurs if there is an issue displaying the image it displays the default user image
      org_image = alt_desc; // Sets the image to the alternative image
    }
    return(
      <span {...card_theme(0,"card")}>

        <img src={isNullOrUndefined(org_image) ?  alt_desc : org_image} {...card_theme(4,"img")}/>
        <h2 id="name" {...card_theme(1,"name")}>{name}</h2>
        <div {...card_theme(2,"details")}>
          <h3 id="type">{"Type: " + type}</h3>
          <h3 id="note">{isNullOrUndefined(distance) ? "Distance: Not Available" : "Distance: " + distance + " mi."}</h3>
          </div>
      </span>
  )
  }
}

export default CardFront;
