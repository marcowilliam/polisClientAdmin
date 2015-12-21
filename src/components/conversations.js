import React from "react";
import { connect } from "react-redux";
import { populateConversationsStore } from "../actions";
import {Link} from "react-router";
import Radium from "radium";
import _ from "lodash";
import Spinner from "./framework/spinner";
import Flex from "./framework/flex";
import Awesome from "react-fontawesome";


const cardHeight = 50;
const cardPadding = 10;
const cardBorderRadius = 3;

const styles = {
  container: {
    backgroundColor: "rgb(240,240,247)",
    paddingTop: 10,
    minHeight: "100vh"
  },
  conversationCard: {
    width: "90%",
    height: cardHeight,
    margin: 10,
    backgroundColor: "rgb(253,253,253)",
    borderRadius: cardBorderRadius,
    padding: cardPadding,
    WebkitBoxShadow: "3px 3px 6px -1px rgba(220,220,220,1)",
    BoxShadow: "3px 3px 6px -1px rgba(220,220,220,1)"
  },
  toAdminLink: {
    height: cardHeight + (2*cardPadding),
    backgroundColor: "#03a9f4",
    marginRight: -cardPadding,
    width: "25%",
    borderTopRightRadius: cardBorderRadius,
    borderBottomRightRadius: cardBorderRadius,
    color: "#ffffff",
    fontWeight: 700,
    fontSize: 24,
    textDecoration: "none",
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    alignItems: "center",
    justifyContent: "center"
  },
  go: {
    marginRight: 10
  }
}

@connect(state => state.conversations)
@Radium
class Conversations extends React.Component {
  componentDidMount() {
    this.props.dispatch(populateConversationsStore())
    // loading true or just do that in constructor
    // check your connectivity and try again
  }
  instantiateConvos() {
    if (this.props.loading) { return <Spinner/> }
    if (!this.props.conversations) { return "No conversations to display" }
    let conversationsMarkup = this.props.conversations.map((conversation, i) => {
      console.log(conversation)
      return (
        <Flex
          justifyContent={"space-between"}
          styleOverrides={styles.conversationCard}
          key={i}>
          <Flex.Item
            small={2}>
            <span>{conversation.topic}</span>
          </Flex.Item>
          <Link
            style={styles.toAdminLink}
            to={"/m/"+conversation.conversation_id}>
              <span style={styles.go}>Go</span><Awesome name="chevron-right"/>
          </Link>
        </Flex>
      )
    })
    return conversationsMarkup;
  }
  firePopulateInboxAction() {
    this.props.dispatch(populateConversationsStore())
  }
  render() {
    return (
      <Flex styleOverrides={styles.container}>
        {this.instantiateConvos() }
      </Flex>
    );
  }
}

export default Conversations;

            // <span>
            //   {"Admin: " + conversation.conversation_id}
            // </span>
// <button onClick={this.firePopulateInboxAction.bind(this)}> Refresh </button>
