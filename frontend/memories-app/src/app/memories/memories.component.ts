import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from "../api.service";
import { MapComponent } from '../map/map.component'

@Component({
  selector: 'app-memories',
  templateUrl: './memories.component.html',
  styleUrls: ['./memories.component.scss']
})
export class MemoriesComponent implements OnInit {
  memories: Array<any>;

  @ViewChild(MapComponent)
  private mapComponent: MapComponent;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void{
    this.api.getMemories()
      .subscribe( ({ results }) => {
        this.memories = results;
      })
  }

  memoryListChangeevent(event: any){
    this.mapComponent.parseMarkersFromMemories(this.memories);
  }

}
