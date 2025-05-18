// import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductModern } from '../../../models/productModern';
import { ThousandSeparatorPipe } from '../../../app/pipes/thousand-separator.pipe';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produits',
  imports: [ ThousandSeparatorPipe ,NgIf,NgFor ],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent implements OnInit {
  constructor(private Router: Router) {}

  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000); 
  }
  


 
  
  products: ProductModern[] = [
    {
      id: 1,
      name: 'Robe Wax "Dakar"',
      description: 'Tissu wax 100% coton',
      price: 28500,
      originalPrice: 35000,
      currency: 'XOF',
      imageUrl: 'assets/tissus.jpg',
      rating: 4.5,
      reviewCount: 24,
      discount: 20
    },
    {
      id: 2,
      name: 'Ensemble en Bazin',
      description: 'Tissu bazin riche',
      price: 45000,
      currency: 'XOF',
      imageUrl: 'assets/bazin.jpeg',
      rating: 5,
      reviewCount: 18,
      isNew: true
    },
    {
      id: 3,
      name: 'Jupe Wax Imprimé',
      description: 'Motifs traditionnels',
      price: 22000,
      originalPrice: 28000,
      currency: 'XOF',
      imageUrl: 'assets/jupe.webp',
      rating: 4,
      reviewCount: 15,
      discount: 15
    },
    {
      id: 4,
      name: 'Top Africain Moderne',
      description: 'Style afro-urbain',
      price: 18000,
      currency: 'XOF',
      imageUrl: 'assets/top.jpg',
      rating: 4.2,
      reviewCount: 12,
      isNew: true
    }
  ];

  
navigateToBoutique() {
  this.Router.navigate(['/boutique']);
}
  getStars(rating: number) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }
    if (hasHalfStar) {
      stars.push('half');
    }
    while (stars.length < 5) {
      stars.push('empty');
    }
    return stars;
  }
}
