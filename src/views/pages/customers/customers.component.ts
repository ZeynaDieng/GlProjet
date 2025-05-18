// import { ProductViewDialogComponent } from './../../../app/product-view-dialog/product-view-dialog.component';
import { CustomerService } from './../../../services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit ,signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
// import { CreateUserDialogComponent } from '../../components/create-user-dialog/create-user-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CreateCustomersComponent } from '../../components/create-customers/customers.component';
import { log } from 'console';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductViewDialogComponent } from '../../components/product-view-dialog/product-view-dialog.component';
import { routes } from '../../../app/app.routes';
import { Router } from '@angular/router';
// import { CreateCustomersComponent } from '../../components/create-customers/customers.component';
@Component({
  selector: 'app-customers',
  standalone: true, 

  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
  ],  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
    // users: any[] = [];
    users = signal<any[]>([]);
user:any;
    isDrawerOpen = false;
    isEditing = false;
    currentUserId: number | null = null;
    // isDropdownOpen=false;
    first_name:string="";
      name: string='';
      phone:string='';
      organisation_email:string="";
      productList = signal<any[]>([]);

    // usersList!: any;
    // totalPages!: number;
    total!: number;
    actualPage: number = 1;
    actualLimit = 5;
    actualStatus!: string;
    search!: string;
    searchControl = new FormControl('');
    safeImageUrl: SafeUrl = '';

    currentPage = 1;
    itemsPerPage = 5; 
    totalItems = 0;  
    totalPages = 1;  
    constructor(
      private customerService: CustomerService,
      private dialog: MatDialog,
      private toast: ToastrService,
      private router: Router,
    ) {
      this.searchControl = new FormControl('');
      this.productList = signal<any[]>([]);
      this.users = signal<any[]>([]);
    }
    filterChanged = new FormControl();

    ngOnInit(): void {
      this.getProductsList(this.currentPage, this.itemsPerPage);
      
      this.searchControl.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe(() => {
          this.currentPage = 1; // Reset à la première page quand on filtre
          this.getProductsList(this.currentPage, this.itemsPerPage);
        });
    }
    
    onFilterChange(): void {
      this.filterChanged.setValue(Date.now()); 
    }
   
    
    get paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.productList().slice(startIndex, startIndex + this.itemsPerPage);
    }
    
    get totalPagesItems() {
      return Math.ceil(this.productList().length / this.itemsPerPage);
    }

    getProductsList(page: number, limit: number): void {
      const params: any = {
        page: page,
        limit: limit,
      };
  
      // Ajout du paramètre de recherche si nécessaire
      if (this.searchControl.value) {
        params.search = this.searchControl.value;
      }
  
      this.customerService.getProductsList(params).subscribe({
        next: (response: any) => {
          this.productList.set(response['hydra:member']);
          this.totalItems = response['hydra:totalItems'];
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        },
        error: (error) => {
          // console.error('Erreur lors du chargement des produits:', error);
        },
      });
    }
  
    changePage(newPage: number): void {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.currentPage = newPage;
        this.getProductsList(this.currentPage, this.itemsPerPage);
      }
    }
    
    
    closeDialog(): void {
      this.isDrawerOpen = false;
    }
  
  
    deleteProduct(productId: number): void {
      console.log('ID du produit à supprimer:', productId);
      if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        this.customerService.deleteProduct(productId).subscribe({
          next: () => {
            this.toast.success('Produit supprimé avec succès.');
            this.getProductsList(this.actualPage, this.actualLimit);
          },
          error: (error) => {
            this.toast.error('Erreur lors de la suppression du produit.');
            console.error(error);
          }
        });
      }
    }
    
    openCreateUserDialog(): void {
      const dialogRef = this.dialog.open(CreateCustomersComponent, {
        panelClass: 'custom-dialog',
      });
  
      dialogRef.componentInstance.userUpdated.subscribe(() => {
       
          this.getProductsList(this.actualPage, this.actualLimit);
        
      });
    }
  
openViewProductDialog(user: any): void {
  const dialogRef = this.dialog.open(ProductViewDialogComponent, {
    panelClass: 'custom-dialog',
    data: {
      user: user,
    }
  });

}

goToViewProduct(product: any): void {
  this.router.navigate(['/detailProduct', product.id]);
}
    openEditUserDialog(user: any): void {
      const dialogRef = this.dialog.open(CreateCustomersComponent, {
        panelClass: 'custom-dialog',
        data: {
          user: user,
          isEditing: true,
          currentUserId: user.id,
        },
      });
  
      dialogRef.componentInstance.userUpdated.subscribe(() => {
        
          this.getProductsList(this.actualPage, this.actualLimit);
        
      });
    }
  
    // changePage(page: number): void {
    //   if (page >= 1 && page <= this.totalPages) {
    //     this.actualPage = page;
    //     this.getProductsList(page, this.actualLimit);
    //   }
    // }
    
    getMinValue(a: number, b: number): number {
      return Math.min(a, b);
    }

    getPageNumbers(): number[] {
      const pages = [];
      const maxVisiblePages = 5; 
      
      let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;
      
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      return pages;
    }
    dropdownStates: { [key: number]: boolean } = {};

    toggleDropdown(userId: number) {
      this.dropdownStates[userId] = !this.dropdownStates[userId];
    }
  
    isDropdownOpen(userId: number): boolean {
      return this.dropdownStates[userId] || false;
    }
  
    closeAllDropdowns() {
      this.dropdownStates = {};
    }

}










