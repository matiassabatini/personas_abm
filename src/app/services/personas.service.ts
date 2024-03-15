import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../models/Persona.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { PersonaDto } from '../models/PersonaDto.model';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  personasList: Persona[] = [];
  private listadoPersonasSubject: BehaviorSubject<Persona[]> =
    new BehaviorSubject<Persona[]>([]);
  constructor(private http: HttpClient) {
    this.getPersonasList();
  }
  private getAll(): Observable<Persona[]> {
    return this.http.get<Persona[]>('assets/db/personas.json');
  }

  private getPersonasList() {
    this.getAll().subscribe(
      (response) => {
        this.personasList = response;
        this.listadoPersonasSubject.next(this.personasList);
        console.log(this.personasList);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  public deletePersona(i: number): void {
    if (i >= 0 && i < this.personasList.length) {
      this.personasList.splice(i, 1);
      this.listadoPersonasSubject.next([...this.personasList]);
    }
  }

  public getListadoPersonasObservable(): Observable<Persona[]> {
    return this.listadoPersonasSubject.asObservable();
  }

  public addPersona(personaDto: PersonaDto): void {
    const nuevoId =
      this.personasList.length > 0
        ? this.personasList[this.personasList.length - 1].id + 1
        : 1;
    const nuevaPersona: Persona = { id: nuevoId, ...personaDto };
    this.personasList.push(nuevaPersona);
    this.listadoPersonasSubject.next([...this.personasList]);
  }

  public getPersonaByIndex(index: number): Persona | null {
    if (index >= 0 && index < this.personasList.length) {
      return this.personasList[index];
    } else {
      return null;
    }
  }

  public editPersonaByIndex(index: number, personaDto: PersonaDto): void {
    if (index >= 0 && index < this.personasList.length) {
      const persona: Persona = this.personasList[index];
      const personaEditada: Persona = { ...persona, ...personaDto };
      this.personasList[index] = personaEditada;
      this.listadoPersonasSubject.next([...this.personasList]);
    }
  }
}
