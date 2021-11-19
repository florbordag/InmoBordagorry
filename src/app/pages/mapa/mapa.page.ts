import { AttributeMarker } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})


export class MapaPage implements OnInit, AfterViewInit {

  constructor() { }
  
  ngAfterViewInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZmxvcmJvcmRhZyIsImEiOiJja3Z1MzdzM2I4ZzlwMnFtc2JwcWNjenUyIn0.O8CY18Ci9j4_il783ZXedw';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [ -66.3391366613688,-33.29967344911373],
      pitch: 45, //angulo d la camara
      bearing: -17.6, //inclinacion de norte a sur
      zoom: 15.5,
      antialias: false, //suavizado
    });

    map.on('load', () => {
      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
      (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;
       
      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.addLayer(
      {
      'id': 'add-3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
      'fill-extrusion-color': '#aaa',
       
      // Use an 'interpolate' expression to
      // add a smooth transition effect to
      // the buildings as the user zooms in.
      'fill-extrusion-height': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'height']
      ],
      'fill-extrusion-base': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'min_height']
      ],
      'fill-extrusion-opacity': 0.6
      }
      },
      labelLayerId
      );
      });
// Create a new marker.
    // // const marker = 
    // new mapboxgl.Marker({
    //   color: 'red',
    //   })
    //     .setLngLat([-33.29967344911373, -66.3391366613688])
    //     .addTo(map);

    // Set marker options.
    const marker = new mapboxgl.Marker({
      color: "red",
      draggable: false
    }).setLngLat([ -66.3391366613688,-33.29967344911373])
    .setPopup(new mapboxgl.Popup().setHTML("<h2 style=\"color:#000000\">Inmobiliaria La Punta</h2>"))
      .addTo(map);


      //agrega control de full screen
    map.addControl(new mapboxgl.FullscreenControl());
  }

  ngOnInit() {
  }





}
