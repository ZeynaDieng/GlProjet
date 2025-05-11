import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ThousandSeparatorPipe } from '../../../app/pipes/thousand-separator.pipe';

@Component({
  selector: 'app-produits-fav',
  // exports: [ThousandSeparatorPipe],
  standalone: true,
  imports: [ NgFor,NgClass,NgIf,ThousandSeparatorPipe],
  templateUrl: './produits-fav.component.html',
  styleUrl: './produits-fav.component.css'
})
export class ProduitsFavComponent  implements OnInit {
  isLoading = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000); // délai simulé de 2 secondes
  }

  // Liste des produits
  products: Product[] = [
    {
      id: 1,
      name: 'Robe Wax Élégante',
      description: 'Tissu traditionnel africain',
      price: 25000,
      currency: 'XOF',
      imageUrl: 'assets/robe-1.jpg',
      isNew: true
    },
    {
      id: 2,
      name: 'Robe Bazin Original',
      description: 'Bazin riche de haute qualité',
      price: 35000,
      currency: 'XOF',
      imageUrl: 'assets/robe2.jpg',
      isNew: true,
      discount: 10 // 10% de réduction
    },
    {
      id: 3,
      name: 'Ensemble Complet Wax',
      description: 'Top et jupe assortis',
      price: 45000,
      currency: 'XOF',
      imageUrl: 'assets/robe3.jpg',
      isNew: false
    },
    {
      id: 4,
      name: 'Tenue Traditionnelle',
      description: 'Inspiration Mandingue',
      price: 30000,
      currency: 'XOF',
      imageUrl: 'assets/ensemble1.jpg',
      isNew: true
    }
  ];

  // Méthode pour calculer le prix réduit si discount existe
  getDiscountedPrice(product: Product): number | null {
    return product.discount 
      ? product.price - (product.price * product.discount / 100)
      : null;
  }

}
