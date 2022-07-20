import { Component, ElementRef, Input, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  apiKey: string = 'AIzaSyBfhG_FOO5cNEbSjdbuyXYEinXjS4cUcQs';


  constructor() { }

  ngOnInit() {

    console.log("🚀 ~ file: map.component.ts ~ line 13 ~ MapComponent ~ coords", this.coords)


  }

  ngAfterViewInit(): void{

    this.createMap();

  }



  async createMap() {
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: this.apiKey,
      config: {
        center: {
          lat: lat,
          lng: lng,
        },
        zoom: 15,
      },
    });
    await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng
      }
    })
  }

}
