import { GithubLanguages } from "./GithubLanguages";


export interface Data {
    code: string;
    githubCodeSum: number;
    githubLanguagesList: [GithubLanguages];
  };