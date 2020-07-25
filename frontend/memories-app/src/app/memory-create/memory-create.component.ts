import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-memory-create',
  templateUrl: './memory-create.component.html',
  styleUrls: ['./memory-create.component.scss']
})
export class MemoryCreateComponent implements OnInit {
  memoryForm: FormGroup;
  @Output() hide = new EventEmitter<boolean>();
  @Output() createdMemory = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.memoryForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.minLength(8)),
      latitude: '',
      longitude: ''
    });
  }

  back(){
    this.hide.emit(true);
  }

  onSubmit(): void{
    if ( !this.memoryForm.valid ){
      return;
    }
    this.getCurrentLocation();
  }

  getCurrentLocation(): void{
    navigator.geolocation.getCurrentPosition(position => {
      const currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.postMemory(currentPosition);

    });
  }

  postMemory(currentPosition: any): void{
    const position = { latitude: currentPosition.lat, longitude: currentPosition.lng };
    this.memoryForm.patchValue(position);
    this.api.postMemory(this.memoryForm.value)
    .subscribe( data => {
      if ( data ){
        Swal.fire(
          'Hey!',
          'We have saved your memory :)',
          'success'
        );
        this.hide.emit(true);
        this.createdMemory.emit(data);
      }
    });
  }
}
