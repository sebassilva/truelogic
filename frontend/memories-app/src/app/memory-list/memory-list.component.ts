import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-memory-list',
  templateUrl: './memory-list.component.html',
  styleUrls: ['./memory-list.component.scss']
})
export class MemoryListComponent implements OnInit {
  @Input()
  memories: Array<any>;

  @Output()
  memoryChange = new EventEmitter<any>();;

  public editView =  false;

  constructor(
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
  }

  newMemory(): void{
    this.editView = true;
  }

  changeHide(val: boolean): void{
    this.editView = false;
  }

  createdMemory(memory: any): void{
    this.memoryChange.emit('memoryCreated');
    this.memories.push(memory);
  }

  removeMemory(memoryId: number): void{
    this.api.deleteMemory(memoryId)
      .subscribe( data => {
        const removeIndex = this.memories.map(item => item.id).indexOf(memoryId);
        this.memories.splice(removeIndex, 1);
        this.memoryChange.emit('memoryRemoved');
        Swal.fire(
          'Memory deleted!',
          'No longer does this memory estists.',
          'success'
        );
      }, error => {
         Swal.fire(
        'There was a problem, please try again!',
        error.error.detail,
        'error'
      );
    });
  }
}
