import {AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StarWarsService} from './star-wars.service'
import {Subscription} from "rxjs";
import {People, Vehicle} from "./interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  pSub: Subscription
  fSub: Subscription
  hSub: Subscription
  vSub: Subscription
  sSub: Subscription
  people: People[]
  selectedPerson: string
  currentPerson: People

  constructor(
    private StarWarsService: StarWarsService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.pSub = this.StarWarsService.getPeoples().subscribe(res=>{
      console.log(res)
      this.people = res
      this.changeValue()
      this.cdr.detectChanges()

    },
      error => {console.log(error)}
    )
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.fSub) {
      this.fSub.unsubscribe()
    }
    if (this.hSub) {
      this.hSub.unsubscribe()
    }
    if (this.vSub) {
      this.vSub.unsubscribe()
    }
    if (this.sSub) {
      this.sSub.unsubscribe()
    }
  }


  changeValue () {
    this.people.forEach(person => {
      this.getFilms(person)
      this.getPlanet(person)
      this.getTransport(person)
    })
  }

  getPlanet(person: People) {
    this.hSub = this.StarWarsService.getPlanet(person.homeworld).subscribe(res => {
      this.people = this.people.map(person => {
        return  {
          character: person.character,
          homeworld: res,
          transport: person.transport,
          films: person.films
        }
      })
    })
  }

  getTransport(person: People) {
    let vehicles = this.getVehicle(person.transport.vehicles)
    let starships = this.getStarship(person.transport.starships)
    this.people = this.people.map(person => {
      return  {
        character: person.character,
        homeworld: person.homeworld,
        transport: {
          vehicles,
          starships
        },
        films: person.films
      }
    })
  }

  getVehicle(urls: []): Vehicle[]{
    let vehicles = []
    urls.forEach(url=> {
      this.vSub = this.StarWarsService.getVehicle(url).subscribe(res=>{
        vehicles.push(res)
      })
    })
    return vehicles
  }

  getStarship(urls: []): Vehicle[]{
    let starship = []
    urls.forEach(url=> {
      this.sSub = this.StarWarsService.getStarship(url).subscribe(res=>{
        starship.push(res)
      })
    })
    return starship
  }

  getFilms (person: People) {
    let filmsInfo = []
    person.films.forEach(filmUrl => {
      this.fSub = this.StarWarsService.getFilm(filmUrl).subscribe(res=>{
        filmsInfo.push(res)
      })
    })
    this.people = this.people.map(person => {
      return  {
        character: person.character,
        homeworld: person.homeworld,
        transport: person.transport,
        films: filmsInfo
      }
    })
  }

  selectPerson() {
    this.currentPerson = this.people.find(el => el.character.name == this.selectedPerson)
  }

}
