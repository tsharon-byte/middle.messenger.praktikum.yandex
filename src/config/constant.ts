export const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1601011850287-43e30b7db748?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80';
export const ADD_CHAT_MODAL_NAME = 'addChatModal';
export const ADD_USER_MODAL_NAME = 'addUserModal';
export const REMOVE_USER_MODAL_NAME = 'removeUserModal';
export const REMOVE_CHAT_MODAL_NAME = 'removeChatModal';
export const CHANGE_AVATAR_MODAL_NAME = 'changeAvatarModal';
export const MESSAGES_NAME = 'messages';

export const RESOURCES_URL
    = 'https://ya-praktikum.tech/api/v2/resources';
export const transformAvatar = (avatar:string) => {
    const result = avatar ? RESOURCES_URL + avatar : DEFAULT_AVATAR;
    console.log(result);
    return result;
};
