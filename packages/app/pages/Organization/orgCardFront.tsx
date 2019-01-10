// React component for the frontside of the card
import has = Reflect.has;
import * as React from "react";
import * as themable from "react-themeable";
import * as cardTheme from "./cardStyle.scss";
import {isNullOrUndefined, isUndefined} from "util";
import {NULL} from "graphql/language/kinds";
import defaultimg from './default.png'

class CardFront extends React.Component {


  render() {
    let org = this.props.card;
    let name = org.name;
    let distance = this.props.distance;
    let type = org.type;
    let note = org.note;
    let org_image = org.image;
    let card_theme = themable(cardTheme);

    if(org_image.trim() == ""){
      console.log("DDDDDDDDDDDDD");
      console.log(defaultimg);

    }
    return(
      <span {...card_theme(0,"card")}>
        <img src={isNullOrUndefined(org_image) ? defaultimg : org_image} {...card_theme(4,"img")}/>
        <h2 id="name" {...card_theme(1,"name")}>{name}</h2>
        <div {...card_theme(2,"details")}>
          <h3 id="type">{"Type: " + type}</h3>
          <h3 id="note">{isNullOrUndefined(distance) ? "Distance not available" : "Distance: " + distance + " mi."}</h3>
          </div>
      </span>
  )
  }
}

export default CardFront;
