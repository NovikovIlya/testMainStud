// Типы для сообщений и чатов
export interface MessageResponse {
    id: number;
    message: string;
    senderId: number;
    senderName: string;
    senderType: string;
    dateTime: string;
  }
  
  export interface ChatResponse {
    id: number;
    messages: MessageResponse[];
    isRead: boolean;
    lastMessage: string;
    lastMessageTime: string;
    userId: number;
    userName: string;
  }
  
  export interface MessageRequest {
    senderName: string;
    recipientId?: number;
    recipientName?: string;
    recipientType?: string;
    chatId?: number;
    message: string;
  }
  
  export interface UsersForChatResponse {
    id: number;
    name: string;
    userType: string;
  }
  
  export interface UnreadChatsCountResponse {
    currentUserInternalId: number;
    unreadChatsCount: number;
    userType: string;
  }
  
  // Типы для пользователя
  export interface UserResponse {
    username: string;
    firstname: string;
    lastname: string;
    middlename: string;
    birthday: string;
    phone: string;
    email: string;
    citizenship: string;
    roles: UserSessionData[];
    sessionId: string;
    sessionHash: string;
    allId: string;
  }
  
  export interface UserSessionData {
    userId: string;
    sessionId: string;
    sessionHash: string;
    documentsHash: string;
    login: string;
    type: 'OTHER' | 'STUD' | 'EMPL' | 'ASPIR' | 'ABITUR';
    credentials: EnrolledAbiturientCredentialsData[];
  }
  
  export interface EnrolledAbiturientCredentialsData {
    login: string;
    password: string;
    email: string;
  }