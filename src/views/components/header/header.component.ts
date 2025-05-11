import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Correction de l'import

@Component({
  selector: 'app-header',
  standalone: true, // Ajouté pour un composant standalone
  imports: [], // Peut inclure CommonModule si nécessaire
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigateToBoutique() {
    this.router.navigate(['/boutique']); // Navigation vers la boutique
  }
}