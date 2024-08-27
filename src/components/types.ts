// Define your User type and any other shared types here
export interface User {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    profilePicUrl: string;
    thumbnailUrl: string;
    location: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
    thumbnailColor: string; // added thumbnail color
}