import { Message } from "shared/Api/@types";
import { colorSpectrumArray } from "shared/theme/@types";
import UserApi from "shared/Api/UserApi";
import { Participant } from "../messageSlice";

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
   messages.forEach((message) => {
      if (!participants.filter((user) => user.id === message.senderId).length) {
         let username = 'Anonymous';
         userApi
            .fetchUserNameById(message.senderId)
            .then((result) => {
               username = result; //Change username if appropiate.
            })
            .finally(() => {
               const newParticipant = {
                  id: message.senderId,
                  name: username,
                  color: colors[colorsIndex] || colors[0],
                  isOwner: message.senderId === currentUserId,
               };
               participants.push(newParticipant);

               colorsIndex >= colors.length ? (colorsIndex = 0) : colorsIndex++;
               //cycle to next available color (index)
            });
      }
   });
   return participants;
};