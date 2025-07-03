import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SelectDropdownComponent } from './ui/atoms/select-dropdown/select-dropdown.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SelectDropdownComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedSection = 'dashboard';
  selectedItem: string | null = null;

  constructor(private router: Router){}
  
  select(item: string) {
    console.log('item');
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



