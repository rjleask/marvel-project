import React, { Component } from "react";
import Tour from "react-user-tour";
import "./userTour.css";

class UserTour extends Component {
  constructor() {
    super();
    this.state = {
      isTourActive: true,
      tourStep: 1
    };
  }

  render() {
    return (
      <div className="tour-wrapper">
        <Tour
          active={this.state.isTourActive}
          step={this.state.tourStep}
          onNext={step => this.setState({ tourStep: step })}
          onBack={step => this.setState({ tourStep: step })}
          onCancel={() => this.setState({ isTourActive: false })}
          steps={[
            {
              step: 1,
              selector: ".content-wrapper",
              title: <div className="titleTour">Welcome to Marvel War!</div>,
              body: (
                <div className="bodyTour">
                  The Point of this game is to either be the first to 25 points
                  or control all the cards! You get points/cards by winning
                  tricks
                </div>
              )
            },
            {
              step: 2,
              selector: "#scoredisplay",
              title: <div className="titleTour">Wars</div>,
              body: (
                <div className="bodyTour">
                  Wars occur when the values of both player and computer player
                  are the same, three additonal cards are then added(or as many
                  as possible if below 3)and the last card for each player is
                  compared for the war trick.
                </div>
              )
            },
            {
              step: 3,
              selector: "#scoredisplay",
              title: <div className="titleTour">Double War</div>,
              body: (
                <div className="bodyTour">
                  If the values are again tied after the first war it goes into
                  a tie breaker where a random value will be chosen for both
                  computer and player to see who will take home all the cards!
                </div>
              )
            },
            {
              step: 4,
              selector: "#scoredisplay",
              title: <div className="titleTour">Game Over</div>,
              body: (
                <div className="bodyTour">
                  The game ends when either the computer or player either run
                  out of cards or reach 20 points. Points are equivalent to
                  number of cards won in a trick, so war tricks are worth more.
                </div>
              )
            }
          ]}
        />
      </div>
    );
  }
}

export default UserTour;
