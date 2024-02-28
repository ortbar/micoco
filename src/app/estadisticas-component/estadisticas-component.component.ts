import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartidaService } from '../partida.service';
import { Partida } from '../partida-model';
import { map } from 'rxjs';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-estadisticas-component',
  templateUrl: './estadisticas-component.component.html',
  styleUrls: ['./estadisticas-component.component.css']
})
export class EstadisticasComponentComponent implements AfterViewInit {

  constructor(private router: Router, private serve: PartidaService) {}

  partidasUsuario: Partida[] = [];
  userId: number;
  conf: any;
  conf2: any;
  conf3: any;
  conf4: any;

  ngAfterViewInit() {
    let uid = parseInt(localStorage.getItem('id') ?? '');
    if (!uid || isNaN(uid)) {
      console.log('No hay usuario logueado');
    }
    this.userId = uid;
    this.getPartidasUser();
  }

  volverHome() {
    this.router.navigate(['']);
  }

  getPartidasUser() {
    this.serve.getPartidasUserID(this.userId.toString()).subscribe((p) => {
      this.partidasUsuario = p;
      this.conf = this.estadisitcaPartidasUsuario();
      this.conf2 = this.estadisticaPartidasUsuarioLineal();
      this.conf3 = this.estadisticaPartidasUsuarioPie();
      this.conf4 = this.estadisticaPartidasUsuarioMixed();
      this.showEstadisticas();
    });
  }

  estadisitcaPartidasUsuario() {
    const data = this.partidasUsuario.map((p) => {
      return [
        new Date(p.fecha).getDate() + '/' + new Date(p.fecha).getMonth() + '/' + new Date(p.fecha).getFullYear(),
        p.puntos
      ];
    });

    const fechas = data.map((d) => d[0]);
    const puntos = data.map((d) => d[1]);

    return {
      type: 'bar',
      data: {
        labels: fechas,
        datasets: [
          {
            label: 'Puntos',
            data: puntos,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        indexAxis: 'x',
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Histograma de Puntos por Fecha'
          }
        }
      },
    };
  }

  estadisticaPartidasUsuarioLineal() {
    const data = this.partidasUsuario.map((p) => {
      return [
        new Date(p.fecha).getDate() + '/' + new Date(p.fecha).getMonth() + '/' + new Date(p.fecha).getFullYear(),
        p.puntos
      ];
    });

    const fechas = data.map((d) => d[0]);
    const puntos = data.map((d) => d[1]);

    return {
      type: 'line',
      data: {
        labels: fechas,
        datasets: [
          {
            label: 'Puntos',
            data: puntos,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Evolución de Puntos por Fecha'
          }
        }
      },
    };

  }

  estadisticaPartidasUsuarioPie() {
    const data = this.partidasUsuario.map((p) => {
      return p.puntos;
    });

    const puntosNegativos = data.filter((d) => d < 0).length;
    const puntosPostivos025 = data.filter((d) => d >= 0 && d <= 25).length;
    const puntosPostivos2550 = data.filter((d) => d > 25 && d <= 50).length;

    return {
      type: 'doughnut',
      data: {
        labels: ['Puntos negativos', 'Puntos entre 0 y 25', 'Puntos entre 25 y 50'],
        datasets: [
          {
            label: 'Partidas',
            data: [puntosNegativos, puntosPostivos025, puntosPostivos2550],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Distribución de Puntos por Rango'
          }
        }
      },
    };

  }

  estadisticaPartidasUsuarioMixed() {
    const data = this.partidasUsuario.map((p) => {
      return [
        new Date(p.fecha).getDate() + '/' + new Date(p.fecha).getMonth() + '/' + new Date(p.fecha).getFullYear(),
        p.puntos
      ];
    });

    const fechas = data.map((d) => d[0]);
    const puntos = data.map((d) => d[1]);

    const d = {
      labels: fechas,
      datasets: [{
        type: 'bar',
        label: 'Bar Dataset',
        data: puntos,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)'
      }, {
        type: 'line',
        label: 'Line Dataset',
        data: puntos,
        fill: false,
        borderColor: 'rgb(54, 162, 235)'
      }]
    };

    return {
      type: 'scatter',
      data: d,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

  }

  showEstadisticas() {
    // let chart = new Chart('bar-canvas', this.conf);
    // let chart2 = new Chart('line-canvas', this.conf2);
    let chart3 = new Chart('pie-canvas', this.conf3);
    let chart4 = new Chart('mixed-canvas', this.conf4);
  }
}
