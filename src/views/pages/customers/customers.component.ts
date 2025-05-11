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
// import { CreateCustomersComponent } from '../../components/create-customers/customers.component';
@Component({
  selector: 'app-customers',
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
    createUserForm: FormGroup;
    isDrawerOpen = false;
    isEditing = false;
    currentUserId: number | null = null;
    // isDropdownOpen=false;
    first_name:string="";
      name: string='';
      phone:string='';
      organisation_email:string="";
      usersList = signal<any[]>([]);

    // usersList!: any;
    totalPages!: number;
    total!: number;
    actualPage: number = 1;
    actualLimit = 5;
    actualStatus!: string;
    search!: string;
    searchControl = new FormControl('');
  
    constructor(
      private customerService: CustomerService,
      private fb: FormBuilder,
      private dialog: MatDialog,
      private toast: ToastrService,
      private cdr: ChangeDetectorRef
    ) {
      this.createUserForm = this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        organisation_email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        roles: [''],
        poste: ['', Validators.required],
        max_appointments_per_day: [1, [Validators.required, Validators.min(1)]],
        status: ['active'],
      });
    }
    filterChanged = new FormControl();

    ngOnInit(): void {
      this.getMyPaternList(this.actualPage, this.actualLimit);
    
      this.filterChanged.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe(() => {
          this.getMyPaternList(this.actualPage, this.actualLimit);
        });
    }
    
    // À appeler manuellement quand un filtre change
    onFilterChange(): void {
      this.filterChanged.setValue(Date.now()); // Juste pour déclencher le valueChanges
    }
    
  
    getMyPaternList(page: number, limit: number): void {
      const params: any = {
        page,
        limit,
        ...(this.actualStatus ? { status: this.actualStatus } : {}),
        ...(this.name ? { name: this.name.trim() } : {}),
        ...(this.phone ? { phone: this.phone.trim() } : {}),
        ...(this.organisation_email ? { organisation_email: this.organisation_email.trim() } : {}),
      };
    
      this.customerService.getMyPaternList(params).subscribe({
        next: (response: any) => {
          this.usersList.set(response.data);
          this.totalPages = response.meta.totalPages;
          this.total = response.meta.total;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des utilisateurs:', error);
        },
      });
    }
    
    // toggleUserStatus(user: any): void {
    //   if (!user) return;
    
    //   const previousStatus = user.status;
    //   user.status = !user.status; // Changement immédiat pour le feedback visuel
    
    //   this.customerService.updateUser(user.id, { status: user.status }).subscribe({
    //     next: (response) => {
    //       // Synchronisation avec la réponse serveur si nécessaire
    //       user.status = response.status === 'active'; // Adaptez selon votre API
    //       this.toast.success('Statut mis à jour');
    //     },
    //     error: (error) => {
    //       user.status = previousStatus; // Annulation en cas d'erreur
    //       this.toast.error('Échec de la mise à jour');
    //     }
    //   });
    // }
    
  getStatusColor(status: string): string {
  switch(status) {
    case 'active':
      return '#4CAF50';
    case 'inactive':
      return '#FC2828';
    case 'suspended':
      return '#FFA500';
    case 'rejected':
      return '#808080'; 
    default:
      return '#FC2828';
  }
}

toggleStatusMenu(user: any): void {
  user.showStatusMenu = !user.showStatusMenu;
}

changeStatus(user: any, newStatus: string): void {
  if (user && newStatus !== user.status) {
    const previousStatus = user.status;
    user.status = newStatus;
    user.showStatusMenu = false;
    
    console.log('Envoi au serveur:', { id: user.id, status: newStatus }); // Debug
    
    this.customerService.updateUser(user.id, user).subscribe(
      (updatedUser) => {
        console.log('Réponse du serveur:', updatedUser);
        this.toast.success(`Statut changé à ${newStatus}`);
      },
      (error) => {
        console.error('Détails erreur:', error); 
        user.status = previousStatus;
        this.toast.error(`Échec: ${error.error?.message || error.message}`);
      }
    );
  }
}
    
  
    filterUserData(user: any): any {
      const allowedFields = [
        'first_name',
        'last_name',
        'organisation_email',
        'phone',
        'roles',
        'poste',
        'max_appointments_per_day',
        'status',
      ];
  
      const filteredUser: any = {};
      for (const field of allowedFields) {
        if (user.hasOwnProperty(field)) {
          filteredUser[field] = user[field];
        }
      }
      return filteredUser;
    }
  
    closeDialog(): void {
      this.isDrawerOpen = false;
    }
  
  
    deleteUser(userId: number): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        this.customerService.deleteUser(userId).subscribe(() => {
          this.getMyPaternList(this.actualPage, this.actualLimit);
        });
      }
    }
  
    openCreateUserDialog(): void {
      const dialogRef = this.dialog.open(CreateCustomersComponent, {
        panelClass: 'custom-dialog',
      });
  
      dialogRef.componentInstance.userUpdated.subscribe(() => {
       
          this.getMyPaternList(this.actualPage, this.actualLimit);
        
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
        
          this.getMyPaternList(this.actualPage, this.actualLimit);
        
      });
    }
  
    changePage(page: number): void {
      if (page >= 1 && page <= this.totalPages) {
        this.actualPage = page;
        this.getMyPaternList(page, this.actualLimit);
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










