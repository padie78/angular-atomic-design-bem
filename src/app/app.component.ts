import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private router: Router){}

  selectedItem: string | null = null;
  select(item: string) {
    this.selectedItem = item;
    console.log('Seleccionó:', item);
    // Aquí podés hacer la acción: abrir modal, cargar datos, etc.
    if (item === 'dashboard') {
        this.router.navigate(['/']); // o la ruta que hayas definido
    } 
    if (item === 'order') {
        this.router.navigate(['/orders']); // o la ruta que hayas definido
    } else if (item === 'payment') {
        this.router.navigate(['/payments']);
    }
  }
}



