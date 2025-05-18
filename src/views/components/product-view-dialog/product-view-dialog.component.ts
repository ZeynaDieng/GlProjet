import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-view-dialog.component.html',
  styleUrls: ['./product-view-dialog.component.css']
})
export class ProductViewDialogComponent implements OnInit {
  product: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    } else {
      console.error('No product ID found in route');
      this.isLoading = false;
    }
  }

  loadProduct(id: string): void {
    // Correction: Utilisez le paramètre 'id' au lieu de 'productId'
    this.customerService.getProductById(+id).subscribe({ // Le + convertit string en number
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load product', error);
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    window.history.back();
  }
}