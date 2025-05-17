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
    totalPages!: number;
    total!: number;
    actualPage: number = 1;
    actualLimit = 5;
    actualStatus!: string;
    search!: string;
    searchControl = new FormControl('');
    safeImageUrl: SafeUrl = '';

  
    constructor(
      private customerService: CustomerService,
      private fb: FormBuilder,
      private dialog: MatDialog,
      private toast: ToastrService,
      private cdr: ChangeDetectorRef,
      private sanitizer: DomSanitizer
    ) {
      this.searchControl = new FormControl('');
      this.productList = signal<any[]>([]);
      this.users = signal<any[]>([]);
    }
    filterChanged = new FormControl();

    ngOnInit(): void {
      this.getProductsList(this.actualPage, this.actualLimit);
    
      this.filterChanged.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe(() => {
          this.getProductsList(this.actualPage, this.actualLimit);
        });
    }
    
    onFilterChange(): void {
      this.filterChanged.setValue(Date.now()); 
    }
    


    
    getProductsList(page: number, limit: number): void {
      const params: any = {
        page: page,
        limit: limit,
      };
    
      this.customerService.getProductsList(params).subscribe({
        next: (response: any) => {
          this.productList.set(response['hydra:member']);
          this.total = response['hydra:totalItems'];
          this.totalPages = Math.ceil(this.total / this.actualLimit);
        },
        error: (error) => {
          // console.error('Erreur lors du chargement des produits:', );
        },
      });
    }
    
    // getProductsList(page: number, limit: number): void {
    //   const params: any = {
       
    //   };
    
    //   this.customerService.getProductsList(params).subscribe({
    //     next: (response: any) => {
    //       this.productList.set( response["hydra:member"]  );
    //       console.log('Liste des utilisateurs:', this.productList());
    //       this.total = response['hydra:totalItems'];
    //       console.log('Total:', this.total);
    //       this.totalPages = Math.ceil(this.total / this.actualLimit);
    //     },
    //     error: (error) => {
    //       // console.error('Erreur lors du chargement des produits:', error);
    //     },
    //   });
    // }

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
  
    changePage(page: number): void {
      if (page >= 1 && page <= this.totalPages) {
        this.actualPage = page;
        this.getProductsList(page, this.actualLimit);
      }
    }
    // toggleDropdown(userId: number): void {
    //   this.isDropdownOpen = !this.isDropdownOpen;
    // }

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










