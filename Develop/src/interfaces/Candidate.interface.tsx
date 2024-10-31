// TODO: Create an interface for the Candidate objects returned by the API
export default interface Candidate {
    id: number;
    login: string
    bio: string;
    avatar_url: string;
    html_url: string;
    name?: string;
    location?: string;
    email?: string;
    company?: string;
  }