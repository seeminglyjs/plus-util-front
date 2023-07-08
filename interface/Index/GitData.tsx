import { GithubLanguages } from "./GithubLanguages";


export interface GitData {
    code: string;
    githubCodeSum: number;
    githubLanguagesList: [GithubLanguages];
  };