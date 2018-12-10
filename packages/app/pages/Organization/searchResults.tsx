// React component for the frontside of the card
import has = Reflect.has;
import * as React from "react";
import * as themable from "react-themeable";
import CardFront from  "./orgCardFront";
import * as theme from "./cardStyle.scss";




class SearchResults extends React.Component {



  render() {
    let curr_theme = themable(theme);
    const cards = [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz"
      },
      {
        id: 2,
        name: "Joe Beckett",
        username: "JBees",
        email: "BeckettJ@yourarea.com"
      }]
    const CardList = ({ cardData }) => {
      const cardsArray = cardData.map(card => (
        <CardFront
        h1={card.name}
        p1={card.username}
        p2={card.email}
        />
      ));

      return (
        <div>
          {cardsArray}
        </div>
      );
    };

    return(
      <div {...curr_theme(0,".card")} className='card-container'>
        <div>
          <CardList cardData={cards} />
        </div>
      </div>
    )
  }
}

export default SearchResults;
