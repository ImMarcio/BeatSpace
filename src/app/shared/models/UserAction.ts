export interface UserAction {
    id?: number;
    userId:string;
    username: string;
    action: string;
    details?: string;
    timestamp?: string;
  }