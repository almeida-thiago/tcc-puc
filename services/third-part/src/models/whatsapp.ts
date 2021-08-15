export interface WhatsappChat {
  id: string;
  tag: any;
  pendingMsgs: boolean;
  unreadCount: number;
  archive: boolean;
  isReadOnly: boolean;
  pin: boolean;
  contact: {
    name: string;
    avatar: string;
    isBusiness: boolean;
    phoneNumber: string;
  }
}

export interface WhatsappMessage {
  body: string;
  type: string;
  subtype: string;
  matchedText: string;
  thumbnail: string;
  title: string;
  fromMe: boolean;
  sender: {
    name: string;
    avatar: string;
    isBusiness: boolean;
    phoneNumber: string;
  }
  timestamp: number;
  isMedia: boolean;
}

export interface WhatsappSendMessage {
  to: number;
  message: string;
}

export interface WhatsappSendMedia {
  to: number;
  message?: string;
  type: 'audio' | 'image' | 'file' | 'link';
  filename: string;
  data: string;
}
