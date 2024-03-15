import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(
    private fb: FormBuilder,
    private personaService: PersonasService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
    });
  }

  ngOnInit() {}

  addPersona() {
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
}
