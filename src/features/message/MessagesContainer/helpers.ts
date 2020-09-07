import { Message, ConversationUser } from 'shared/Api/@types';
import { colorSpectrumArray } from 'shared/theme/@types';
import UserApi from 'shared/Api/UserApi';
import { Participant } from '../messageSlice';

/**
 * A function for gathering and generating information relating to each user
 * participant of a conversation.
 *
 * Fetches the participants name from the API.
 *
 * Generates a color for each participant from the Spectrum array.
 * Informs if the participant is the current user, to highlight if message owner.
 *
 * @param messages The messages from which to gather participant ids
 * @param participants An array of users participating in the given conversation.
 * @param currentUserId The currentUser viewing the conversation.
 * @returns Participant[] an array of objects containg participant details
 */
export const generateParticipants = (
   messages: Message[],
   currentUserId: number,
   participants: Participant[] = []
) => {
   // this should look at messages, if new user fetch name and assign a color.
   const colors = colorSpectrumArray;
   let colorsIndex = 0;
   if (participants.length) {
      //if participants already populated, set index to last color used + 1.
      const lastColorUsed = participants[participants.length - 1].color;
      colorsIndex = colors.findIndex((color) => color === lastColorUsed) + 1;
   }
   const userApi = new UserApi();
   let result: Participant[] = [];
   messages.forEach((message) => {
      if (!result.filter((participant) => participant.id === message.senderId).length) {
         //  let username = 'Anonymous';
         const newParticipant = {
            id: message.senderId,
            name: 'Anonymous',
            color: colors[colorsIndex] || colors[0],
            isOwner: message.senderId === currentUserId,
         };
         result.push(newParticipant);
         userApi
            .fetchUserNameById(message.senderId)
            .then((res) => {
               console.log('res', res);
               newParticipant.name = res; //Change username if appropiate.
            })
            // .catch((error) => {
            //    console.error(error)
            //    result.push(newParticipant)

            //   })
            .finally(() => {
               //cycle to next available color (index)
            });
         colorsIndex >= colors.length ? (colorsIndex = 0) : colorsIndex++;
      }
   });
   return result;
};

const usersToParticipants = (users: ConversationUser[], currentUserId: number) => {
   const userApi = new UserApi();
   const colors = colorSpectrumArray;
   let colorsIndex = -1;
   const participants = users.map((user) => {
      colorsIndex++;
      if (colorsIndex >= colors.length) colorsIndex = 0;
      const participant = userApi.fetchUserNameById(user.userid).then((result) => {
         return { ...user, color: colors[colorsIndex], name: result };
      });
      console.log('MessagesContainer -> participant', participant);
      return participant;
    });
    return participants;
};
