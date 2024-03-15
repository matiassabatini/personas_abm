import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/Persona.model';
import { PersonaDto } from 'src/app/models/PersonaDto.model';
import { PersonasService } from 'src/app/services/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.scss'],
})
export class CrearEditarComponent implements OnInit {
  form: FormGroup;
  editando: boolean = false;
  idPersona: number = 0;
  constructor(
    private fb: FormBuilder,
    private personaService: PersonasService,
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
    });
  }

  ngOnInit() {
    //aca puse id pero en realidad estoy usando el index del array.
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      const idPersona: string = id;
      this.idPersona = parseInt(idPersona);
    }
    if (id) {
      this.editando = true;
      this.getPersonaIndex();
    } else {
      this.editando = false;
    }
  }

  private getPersonaIndex() {
    const personaAeditar = this.personaService.getPersonaByIndex(
      this.idPersona
    );
    if (personaAeditar !== null) {
      console.log(personaAeditar);
      this.form.patchValue({
        nombre: personaAeditar.nombre,
        apellido: personaAeditar.apellido,
        edad: personaAeditar.edad,
      });
    }
  }

  public editPersonaIndex() {
    const personaEditada: PersonaDto = new PersonaDto();
    personaEditada.nombre = this.form.value.nombre;
    personaEditada.apellido = this.form.value.apellido;
    personaEditada.edad = this.form.value.edad;

    this.personaService.editPersonaByIndex(this.idPersona, personaEditada);

    Swal.fire({
      icon: 'success',
      title: 'La Persona se ha editado con éxito',
      text: '',
    }).then((result) => {
      this.router.navigate(['/']);
    });
  }

  public addPersona() {
    console.log(this.form);
    const persona: PersonaDto = new PersonaDto();
    persona.nombre = this.form.value.nombre;
    persona.apellido = this.form.value.apellido;
    persona.edad = this.form.value.edad;
    console.log(persona);
    this.personaService.addPersona(persona);
    Swal.fire({
      icon: 'success',
      title:
        'La Persona: ' +
        persona.nombre +
        ' ' +
        persona.apellido +
        ' se ha creado con éxito',
      text: '',
    }).then((result) => {
      this.router.navigate(['/']);
    });
  }

  public resetForm() {
    this.form.reset();
  }
}
