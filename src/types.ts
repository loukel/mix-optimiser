export interface ISong {
  id: string;
  name: string;
  key: string;
};

export interface ISongMap { 
  [id: string]: {[id: string]: number} 
}