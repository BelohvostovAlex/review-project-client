interface Sender {
  username: string;
  _id: string;
  email: string;
}

export interface IComment {
  _id?: string;
  sender: Sender;
  review: string;
  text: string;
  time: Date;
}
