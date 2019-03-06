import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  usuarios: Usuario[] = [];
  medico: Medico = new Medico('', '', '', '', '');

  constructor(public _medicoService: MedicoService, private _hospitalService: HospitalService, private _usuarioService: UsuarioService, 
    public _reouter: Router, public _activatedRoute: ActivatedRoute) {

    _activatedRoute.params.subscribe(parametros => {
      let id = parametros['id'];
      if ('nuevo' !== id) {
        this.cargarMedico(id);
      }
    });
  }

  cargarMedico (id) {
    this._medicoService.leerMedicoPorId(id).subscribe(medico => {
      this.medico = medico;
      this.cambioHospital(medico.hospital);
    });
  }

  ngOnInit() {
    this.cargarHospitales();
    this.cargarUsuarios();
  }

  guardarMedico(forma: NgForm) {
    console.log(forma.valid);
    console.log(forma.value);
    if (forma.invalid) {
      console.log('Validar que todos los campos esten llenos...!');
      return;
    }

    this.crearMedico();


  }
 crearMedico() {
    this._medicoService.crearMedico(this.medico).subscribe(resp => {
      if (resp) {
        console.log(resp);
        alert('Médico creado ...!');
      }
    });
  }
  actualizarMedico(medico: Medico) {
    this._medicoService.actualizarMedico(medico).subscribe(resp => {
      if (resp) {
        // this.alertUpdate();
        alert('Médico actualizado ...!');
      }
    });
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales().subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
    });
  }

  cargarUsuarios() {
    this._usuarioService.cargarUsuarios().subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
    });
  }

  cambioHospital(id) {
    if ('' !== id) {
      this._hospitalService.obtenerHospitalPorId(id).subscribe((resp: any) => {
        // console.log(resp);
        this.hospital = resp;
      });
    } else {
      this.hospital = new Hospital('');
    }
  }

}
