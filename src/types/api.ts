export interface ApiLink {
  name: string;
  url: string;
}

export interface ApiParameter {
  name: string;
  in: string;
  type: string;
  required: boolean;
  bodyParameters?: {
    name: string;
    type: string;
    required: boolean;
  }[];
}

export interface ApiEndpoint {
  name: string;
  method: string;
  endpoint: string;
  summary: string;
  parameters: ApiParameter[];
  exampleResponse?: any;
}

export interface ApiSection {
  name: string;
  endpoints: ApiEndpoint[];
}

export interface CommonResponse {
  code: string;
  description: string;
} 