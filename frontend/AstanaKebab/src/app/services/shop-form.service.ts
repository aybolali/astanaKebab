import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  private countriesUrl = environment.astaanaKebabApiUrl + '/countries'
  private statesUrl = environment.astaanaKebabApiUrl + '/states'

  constructor(
    private httpClient : HttpClient
  ) { }

  getCountries():Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    )
  }

  getStates(countryCode:string):Observable<State[]>{
    const searchStatesUrl = `${this.statesUrl}/search/findStatesByCountryCode?code=${countryCode}`
    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    )
  }

  getCreditCardMonths(startMonth:number):Observable<number[]>{
    let data : number[] = []

    //build an array for month dropdown list starting from currect month
    
    for(let theMonth = startMonth; theMonth<=12; theMonth++){
      data.push(theMonth)
    }

    return of(data) //will wrap an object as an Observable 
  }

  getCreditCardYears():Observable<number[]>{
    let data : number[] = []

    const startYear:number = new Date().getFullYear() //current year
    const endYear:number = startYear + 10
    
    for(let theYear = startYear; theYear<=endYear; theYear++){
      data.push(theYear)
    }

    return of(data) //will wrap an object as an Observable 
  }
}

interface GetResponseCountries{
  _embedded : {
    countries : Country[]
  }
}

interface GetResponseStates{
  _embedded : {
    states : State[]
  }
}