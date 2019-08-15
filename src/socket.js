import * as io from 'socket.io-client';
import { chatMessages, newChatMessage, newWallPost, oldWallPost } from './actions';
// console.log('yo');

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

    socket.on(
        'newWallPost',
        val => store.dispatch(
            newWallPost(val)
        )
    );

    socket.on(
        'oldWallPost',
        val => store.dispatch(
            oldWallPost(val)
        )
    );
};

// socket.on('newPlayer', () => console.log('New Player'));
//
// socket.on(
//     'greeting',
//     payload => {
//         console.log(payload);
//         socket.emit('nice', {
//             chicken: 'funky'
//         });
//     }
// );
