import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, Subscription} from "rxjs";
import {People, peopleResponse, Film, Planet, Vehicle, Starship} from "./interfaces";
import {map, pluck} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class StarWarsService {

  planet
  pSub: Subscription
  constructor(
    private http: HttpClient
  ) {}

  getPeoples():Observable<People[]> {
    return this.http.get<People[]>(`https://swapi.dev/api/people/`)
      .pipe(
        pluck('results'),
        map((response: {[key: string]: any})=>{
          return Object
            .keys(response)
            .map(key => ({
              character: {
                name: response[key].name,
                height: response[key].height,
                mass: response[key].mass,
                birth_year: response[key].birth_year,
                gender: response[key].gender,
                eye_color: response[key].eye_color,
                skin_color: response[key].skin_color,
                hair_color: response[key].hair_color,
              },
              homeworld: response[key].homeworld,
              films:  response[key].films ,
              transport: {
                vehicles: response[key].vehicles,
                starships: response[key].starships
              },
            }))
        })
      )
  }

  getFilm(url: string): Observable<Film>{
    return this.http.get<Film>(url)
      .pipe(
        map(film=>{
          return {
            title: film.title,
            release_date: film.release_date,
          }
        })
      )
  }

  getPlanet(url: string): Observable<Planet>{
    return this.http.get<Planet>(url)
      .pipe(
        map(planet=>{
          return {
            name: planet.name,
            population: planet.population
          }
        })
      )
  }

  getVehicle(url: string): Observable<Vehicle>{
    return this.http.get<Vehicle>(url)
      .pipe(
        map(vehicle=>{
          return {
            name: vehicle.name,
            model: vehicle.model
          }
        })
      )
  }

  getStarship(url: string): Observable<Starship>{
    return this.http.get<Starship>(url)
      .pipe(
        map(starship=>{
          return {
            name: starship.name,
            model: starship.model
          }
        })
      )
  }
}
