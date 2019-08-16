import * as io from 'socket.io-client';
import { chatMessages, newChatMessage, newWallPost, oldWallPost } from './actions';
console.log('yo');

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
    }

    socket.on(
        'chatMessages',
        msg =>
            store.dispatch(
                chatMessages(msg)
            )
    );

    socket.on(
        'newChatMessage',
        msg => store.dispatch(
            newChatMessage(msg)
        )
    );
};
