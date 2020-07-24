import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ){
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.minLength(8))
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    console.log(this.loginForm.valid)
    if ( !this.loginForm.valid ){
      return;
    }
    console.log("holaa")
    this.api.login(this.loginForm.value).subscribe( data => {
      localStorage.setItem('user', JSON.stringify( data ));
      if (data.access){
        // If login is correct, navigate to users
        this.router.navigate(['/memories']);
      }
    }, error => {
      Swal.fire(
        'There was an error!',
        'Please verify your credentials',
        'error'
      );
   });
  }

}
