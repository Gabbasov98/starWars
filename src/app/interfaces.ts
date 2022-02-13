import {Observable} from "rxjs";

export interface peopleResponse {
  count: number
  next: string
  previous: any
  results: People[]
}

export interface People {
  character?: Character
  homeworld?: Planet | any
  films?: string[] | any
  transport?: {vehicles?: Vehicle[] | any, starships?: Starship[] | any}
}

export interface Character {
  name?: string
  height?: string
  mass?: string
  birth_year?: string
  gender?: string
  eye_color?: string
  skin_color?: string
  hair_color?: string
}

export interface Film {
  title?: string
  release_date?: string
}

export interface Planet {
  name: string
  population: string
}

export interface Vehicle {
  name: string
  model: string
}

export interface Starship {
  name: string
  model: string
}

