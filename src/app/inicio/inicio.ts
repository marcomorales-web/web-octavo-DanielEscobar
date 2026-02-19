import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent implements OnInit {

  deslizado = false;

  consolas = [
    'PlayStation',
    'Xbox',
    'Nintendo'
  ];

  selectedIndex = 0;
  leyendo = false;

  ngOnInit() {
    window.addEventListener("gamepadconnected", () => {
      console.log("🎮 Gamepad conectado");
      this.leerGamepad();
    });
  }

  leerGamepad() {
    if (this.leyendo) return;
    this.leyendo = true;

    const loop = () => {
      const gamepads = navigator.getGamepads();
      const gp = gamepads[0];

      if (gp) {

        if (gp.buttons[0].pressed) {
          this.seleccionar();
        }

        if (gp.axes[1] > 0.5) {
          this.moverAbajo();
        }
        if (gp.axes[1] < -0.5) {
          this.moverArriba();
        }
      }

      requestAnimationFrame(loop);
    };

    loop();
  }

  moverAbajo() {
    if (this.selectedIndex < this.consolas.length - 1) {
      this.selectedIndex++;
    }
  }

  moverArriba() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }
  }

  seleccionar() {
    console.log("Seleccionado:", this.consolas[this.selectedIndex]);
  }

  deslizar() {
    this.deslizado = true;
  }
}
