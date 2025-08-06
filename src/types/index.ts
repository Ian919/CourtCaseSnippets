export interface Party {
  is_matched?: boolean;
  role_name: string;
  name: string;
  papers_pretty: string[];
}

export interface Progress {
  name: string;
  date?: string;
}

export interface Links {
  card: string[];
}

export interface CaseData {
  id: string | number;
  start_date: string;
  parties: Party[];
  court_name: string;
  type_name: string;
  result?: string;
  number: string;
  region: string;
  judge: string;
  papers_pretty: string[];
  progress: Progress[];
  links: Links;
}

export interface SelectedValues {
  dates: Set<string>;
  participantTypes: Set<string>;
  courts: Set<string>;
  caseTypes: Set<string>;
  results: Set<string>;
}
