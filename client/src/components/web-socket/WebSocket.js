import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { showNotification } from '../../utils/showNotification';

const WebSocketComponent = ({ user }) => {


    useEffect(() => {
        const socketurl = `${process.env.REACT_APP_API_DEFAULT_BASE_URL}/websocket/v1/challenge-invite`
        console.log('socket url ', socketurl)
        const socket = new SockJS(socketurl);
        const stompClient = Stomp.over(socket);

        console.log('i ran oo from socket')

        stompClient.connect({}, () => {
            console.log('connected')
            const userId = user?.email;
            stompClient.subscribe(`/topic/user/${userId}/challenge-invite/notification`, (message) => {
              const notification = JSON.parse(message.body);
              console.log('Received notification:', notification);
                showNotification('success', notification?.message);
            });
          });


        return () => {
            stompClient.disconnect();
        };
    }, [user?.email]);


    const sockerIOImpl = () => {
        const socketurl = `${process.env.REACT_APP_API_DEFAULT_BASE_URL}/websocket/v1/challenge-invite`
        console.log('socket url ', socketurl)
        const socket = io(socketurl);
        console.log('i ran oo from socket')
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('connect_error', (error) => {
            console.error('Socket.IO connection error:', error);
          });

        const userId = user?.email;
        socket.on(`/user/${userId}/challenge-invite/notification`, (data) => {
            console.log('Received notification:', data);
            showNotification('success', data?.message);
        });

        return () => {
            socket.disconnect();
        };
    }

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
