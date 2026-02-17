import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements AfterViewInit {

  vista: 'login' | 'registro' = 'login';

  consolas = [
    { nombre: 'Play Station', src: '/assets/img/logoplay.png' },
    { nombre: 'XBOX', src: '/assets/img/logo2xbos.png' },
    { nombre: 'NINTENDO', src: '/assets/img/logonintendo.png' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, 
  private router: Router
  ) {}

  mostrarLogin() {
    this.vista = 'login';
  }

  mostrarRegistro() {
    this.vista = 'registro';
  }

  irInicio() {
    this.router.navigate(['/inicio']);
  }
    

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const fondo = document.querySelector('.fondo-consolas') as HTMLElement;
    if (!fondo) return;

    setInterval(() => this.crearImagen(fondo), 300);
  }

  crearImagen(fondo: HTMLElement) {
    const consola = this.consolas[Math.floor(Math.random() * this.consolas.length)];
    const img = document.createElement('img');

    img.src = consola.src;
    img.style.position = 'absolute';
    img.style.left = `${Math.random() * window.innerWidth}px`;
    img.style.top = `${window.innerHeight + 50}px`;
    img.style.width = `${40 + Math.random() * 60}px`;
    img.style.opacity = '0.15';
    img.style.pointerEvents = 'none';
    img.style.mixBlendMode = 'multiply'

    fondo.appendChild(img);

    let y = window.innerHeight + 50;
    const speed = 0.5 + Math.random() * 1.5;

    const animar = () => {
      y -= speed;
      img.style.top = `${y}px`;

      if (y < -120) {
        img.remove();
        return;
      }

      requestAnimationFrame(animar);
    };

    requestAnimationFrame(animar);
  }
}