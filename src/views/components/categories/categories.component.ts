import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/categories.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  
  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000); // délai simulé de 2 secondes
  }
  categories: Category[] = [
    {
      id: 1,
      name: 'Robes Traditionnelles',
      description: 'Wax & Bazin',
      imageUrl: 'assets/robe2.jpg',
      altText: 'Robes africaines en wax coloré'
    },
    {
      id: 2,
      name: 'Accessoires',
      description: 'Bijoux & Sacs',
      imageUrl: 'assets/accessoires2.jpg',
      altText: 'Accessoires africains artisanaux'
    },
    {
      id: 3,
      name: 'Tissus Wax',
      description: 'Imprimés uniques',
      imageUrl: 'assets/tissus.jpg',
      altText: 'Tissus wax africains colorés'
    },
    {
      id: 4,
      name: 'Tenues Modernes',
      description: 'Style afro-urbain',
      imageUrl: 'assets/tenuModerne.jpg',
      altText: 'Tenues modernes inspirées de la culture africaine'
    }
  ];
}
