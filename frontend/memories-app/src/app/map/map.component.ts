import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit {

  @Input()
  memories: Array<any>;

  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  markers = [];

  constructor() { }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  ngOnChanges(changes: SimpleChanges): void{
    this.parseMarkersFromMemories();

  }

  getCurrentLocation(): void{
    navigator.geolocation.getCurrentPosition(position => {

      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  parseMarkersFromMemories(memories: Array<any> = null): void{
    if (!memories){
      memories = this.memories;
    }
    if (!memories){
      return;
    }
    this.markers = [];
    for ( const memory of memories ){
      const location = {
        position: {
          lat: parseFloat(memory.latitude),
          lng: parseFloat(memory.longitude),
        },
        label: {
          color: 'white',
          text: memory.title,
        },
        title: memory.title,
        options: { animation: google.maps.Animation.BOUNCE },
      };
      this.markers.push(location);
    }
  }
}
