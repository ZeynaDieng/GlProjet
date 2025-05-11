import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../components/header/header.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProduitsFavComponent } from '../../components/produits-fav/produits-fav.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { ProduitsComponent } from '../../components/produits/produits.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TemoignagesComponent } from '../../components/temoignages/temoignages.component';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent,RouterLink,ProduitsFavComponent,CategoriesComponent,ProduitsComponent,FooterComponent,TemoignagesComponent], // Removed NgIf as it's included in CommonModule
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})
export class BuyComponent {
  constructor(private route: ActivatedRoute) {}

  open = false;
  searchTerm = '';

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollToFragment(fragment);
      }
    });
  }

  private scrollToFragment(fragment: string): void {
    // Delay slightly to ensure DOM is ready
    setTimeout(() => {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' // You can use 'center' or 'end' as needed
        });
      }
    }, 100);
  }

  toggleMenu(): void {
    this.open = !this.open;
  }

  closeMenu(): void {
    this.open = false;
  }

  search(event?: Event): void {
    if (event && event.target) {
      const inputElement = event.target as HTMLInputElement;
      this.searchTerm = inputElement.value.trim().toLowerCase();
      
      // Implement your search logic here
      // Example:
      // this.filteredItems = this.items.filter(item => 
      //   item.name.toLowerCase().includes(this.searchTerm)
      // );
    }
  }
}