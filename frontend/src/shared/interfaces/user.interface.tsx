// src/shared/interfaces/user.interface.ts

export interface IUser {
  _id: string; 
  username: string;
  email: string;
  role?: string;
  designation?: string;
  address?: string;
  bio?: string;
  experience?: IExperience[]; // <-- CORRECTED LINE
}

export interface IExperience {
  _id?: string; 
  title: string;
  company: string;
  description?: string;
}