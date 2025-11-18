import { Component } from '@angular/core';
import * as L from 'leaflet';
import { LatLngTuple } from 'leaflet';

@Component({
  selector: 'app-mapa',
  imports: [],
  templateUrl: './mapa.html'
})
export class Mapa {

    ngAfterViewInit(): void {
    const map = L.map('map', { scrollWheelZoom: false, zoomControl: false});

    L.control.zoom({
      position: 'bottomleft'
    }).addTo(map);

    // Capa base oscura
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16
    }).addTo(map);

    // Datos de las sedes
    const sedes: { coords: LatLngTuple, nombre: string, direccion: string, telefono: string }[] = [
      { coords: [-6.7714, -79.8409], nombre: "Hotel Italia - Sede 1", direccion: "7 de Enero Nº 1374", telefono: "(074) 205 717" },
      { coords: [-6.7700, -79.8450], nombre: "Hotel Italia - Sede 2", direccion: "Arica Nº 1156", telefono: "(074) 204 417" }
    ];

    // Icono personalizado
    const hotelIcon = L.icon({
      iconUrl: 'assets/img/hotelgps.png',
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -35]
    });

    // Crear marcadores
    const markers = sedes.map(sede =>
      L.marker(sede.coords, { icon: hotelIcon })
        .bindPopup(`
          <strong>${sede.nombre}</strong><br>
          ${sede.direccion}<br>
          Tel: ${sede.telefono}
        `)
        .bindTooltip(sede.nombre)
    );

    // Agrupar y ajustar zoom
    const group = L.featureGroup(markers).addTo(map);
    map.fitBounds(group.getBounds(), { padding: [50, 50] });
  }
}
