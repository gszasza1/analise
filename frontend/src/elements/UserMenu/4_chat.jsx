import React from "react";

import SockJsClient from "react-stomp";
import jsonfetch from "json-fetch";
import {TalkBox} from "react-talk";
import "./css/chat_box.css";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        // randomUserId is used to emulate a unique user id for this demo usage
        this.randomUserName = "";
        this.randomUserId = sessionStorage.getItem("id");
        this.state = {
            clientConnected: false,
            messages: []
        };
    }

    onMessageReceive = (msg) => {
        this.setState(prevState => ({
            messages: [...prevState.messages, msg]
        }));
    };

    sendMessage = (msg, selfMsg) => {
        try {
            this.clientRef.sendMessage("/app/all", JSON.stringify(selfMsg));
            return true;
        } catch (e) {
            return false;
        }
    };

    componentWillMount() {
        jsonfetch("/history", {
            method: "GET"
        }).then((response) => {
            this.setState({messages: response.body});
        });
    }

    render() {
        const wsSourceUrl = window.location.protocol + "//" + window.location.host + "/handler";
        return (
            <div>
                <TalkBox topic="" currentUserId={this.randomUserId}
                         currentUser={this.randomUserName} messages={this.state.messages}
                         onSendMessage={this.sendMessage} connected={this.state.clientConnected}/>

                <SockJsClient url={wsSourceUrl} topics={["/topic/all"]}
                              onMessage={this.onMessageReceive} ref={(client) => {
                    this.clientRef = client
                }}
                              onConnect={() => {
                                  this.setState({clientConnected: true});
                              }}
                              onDisconnect={() => {
                                  this.setState({clientConnected: false});
                              }}
                              debug={false}/>
            </div>
        );
    }
}

export default Chat