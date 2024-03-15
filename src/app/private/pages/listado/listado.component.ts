import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/Persona.model';
import { PersonasService } from 'src/app/services/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'edad', 'acciones'];
  personasList: Persona[] = [];
  constructor(private personasService: PersonasService) {}

  ngOnInit() {
    this.getListado();
  }
  getListado() {
    this.personasService
      .getListadoPersonasObservable()
      .subscribe((personas) => {
        this.personasList = personas;
      });
  }
  deletePersona(i: number) {
    const personaAeliminar = this.personasList.find(
      (persona, index) => index === i
    );
    Swal.fire({
      title:
        '¿Seguro quiere eliminar a ' +
        personaAeliminar?.nombre +
        ' ' +
        personaAeliminar?.apellido +
        '?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(
          personaAeliminar?.nombre +
            ' ' +
            personaAeliminar?.apellido +
            ' ha sido eliminado.',
          '',
          'success'
        );
        this.personasService.deletePersona(i);
      }
    });
  }
}
