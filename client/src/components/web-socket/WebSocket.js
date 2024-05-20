import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { routeToPath } from '../../utils/routeUtil';
import { showNotification } from '../../utils/showNotification';
import history from '../../utils/history'

const WebSocketComponent = ({ user }) => {


    useEffect(() => {
        const socketurl = `${process.env.REACT_APP_API_DEFAULT_BASE_URL}/websocket/v1/challenge-invite`
        console.log('socket url ', socketurl)
        const socket = new SockJS(socketurl);
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            console.log('connected')
            const userId = user?.email;
            if (!!userId) {
              stompClient.subscribe(`/topic/user/${userId}/challenge-invite/notification`, (message) => {
                const notification = JSON.parse(message.body);
                console.log('Received notification:', notification);
                  showNotification('success', notification?.message);
              });
  
              stompClient.subscribe(`/topic/user/${userId}/challenge-started/notification`, (message) => {
                const challengeNotification = JSON.parse(message.body);
                console.log('Received challenge started notification:', challengeNotification);
                  const challengeObject = JSON.parse(challengeNotification?.message);
                  routeToPath(history, `/challenge/${challengeObject?.challengeId}/details?type=${challengeObject?.type}&mode=group&showInstruction=false`)
              });
            }
          });


        return () => {
            stompClient?.disconnect();
        };
    }, [user?.email]);



    return (
        <div>
        </div>
    );
};

const mapStateToProps = ({ authedUser }) => {
    return ({
      user: authedUser?.user?.studentUser
    })
  }
export default connect(mapStateToProps, null) (WebSocketComponent);
