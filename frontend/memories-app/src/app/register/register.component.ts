import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ){
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.minLength(8))
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    if ( !this.registerForm.valid ){
      return;
    }
    this.api.register(this.registerForm.value).subscribe( data => {
      localStorage.setItem('user', JSON.stringify( data.token ));
      if ( data.token ){
        // If register is correct, navigate to users
        this.router.navigate(['/memories']);
      }
    }, error => {
      Swal.fire(
        'There was an error!',
        'Please try with a different username.',
        'error'
      );
   });
  }

}
