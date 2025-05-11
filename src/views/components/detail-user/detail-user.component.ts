import { Component, OnInit, signal, computed, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { NgClass, NgIf, NgFor, NgForOf, CommonModule } from '@angular/common';
// import { ConfirmDialogComponent } from '../confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
// import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
// import { Validators } from 'ngx-editor';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmDialogComponent } from '../confirm-dialog.component';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
  imports: [NgIf,  CommonModule, ReactiveFormsModule, NgxSpinnerModule],
})
export class DetailUserComponent implements OnInit {
  userId: string | null = null;
  user = signal<any>(null);
  
  status: any;
  actualPage: number = 1;
  data: any;
  actualLimit = 5;
  totalPages!: number;
  isDropdownOpen = false;
  createUserForm: FormGroup;
  isEditing = false;
  currentUserId: number | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() userUpdated = new EventEmitter<void>();
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  deleteUser(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(this.user().data.id,).subscribe(
          () => {
            console.log('Utilisateur supprimé avec succès');
          },
          (error) => {
            console.error(
              "Erreur lors de la suppression de l'utilisateur :",
              error
            );
          }
        );
      }
    });
  }

  // openEditUserDialog(user: any): void {
  //   const dialogRef = this.dialog.open(CreateUserDialogComponent, {
  //     panelClass: 'custom-dialog',
  //     data: {
  //       user: user,
  //       isEditing: true,
  //       currentUserId: this.user.id,
        
  //     },
  //   });
  //   console.log('current',this.currentUserId);
  //   // console.log();
    
  //   this.isDropdownOpen = false;

  //   dialogRef.componentInstance.userUpdated.subscribe(() => {
  //     this.loadUserDetails(user.id);
  //   });
  // }


  openEditUserDialog(user: any): void {
    if (!user) {
      console.error('User data is not available');
      return;
    }
  
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      panelClass: 'custom-dialog',
      data: {
        user: user.data,
        
        isEditing: true,
        currentUserId: user.data.id, 
      },
    });
    console.log('user.user.data',user.data.id);
  console.log(this.currentUserId);
  
    dialogRef.componentInstance.userUpdated.subscribe(() => {
      this.loadUserDetails(user.data.id);
      console.log( 'this.loadUserDetails(user.id)',this.loadUserDetails(user.data.id) );
      this.isDropdownOpen=false;
    });
  }
  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.createUserForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      roles: [''],
      poste: ['', Validators.required],
      max_appointments_per_day: [1, [Validators.required, Validators.min(1)]],
      status: ['actif'],
    });
    // this.isEditing = this.data.isEditing;
    // this.currentUserId = this.data.currentUserId;
  }
  // ngOnInit(): void {
  //   this.userId = this.route.snapshot.paramMap.get('id');
  //   if (this.userId) {
  //     this.loadUserDetails(+this.userId);
  //     this.isEditing = this.data.isEditing || false;
  //     this.currentUserId = this.data.currentUserId || null;
  //   }
    
  // }

  // loadUserDetails(userId: number): void {
  //   this.userService.getUserById(userId).subscribe(
  //     (data) => {
  //       this.user = data;
  //       console.log('User details:', this.user);
  //     },
  //     (error) => {
  //       console.error('Error fetching user details:', error);
  //     }
  //   );
  // }



  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.loadUserDetails(+this.userId);

    }
  }
  
  loadUserDetails(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      (data) => {
        this.user.set(data);
        console.log(userId + 'userId');
        
        console.log('User details:', this.user);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  toggleUserStatus(userId: any): void {
    if (this.user) {
      const currentStatus = this.user().data.status; 
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
  
      const userData = {
        status: newStatus
      };
  
      console.log('Statut à mettre à jour:', userData);
  
      this.userService.updateUser(this.user().data.id, userData).subscribe(
        (response) => {
          console.log('User status updated successfully:', response);
          this.user().data.status = newStatus;
          this.status = newStatus;
          this.cdr.detectChanges(); // 👈 force Angular à redessiner

        },
        (error) => {
          console.error('Error updating user status:', error);
        }
      );
  
      this.userService.getUserById(userId).subscribe(
        (data) => {
          this.status = data.statut;
          console.log('User details toggle status:', data);
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  }
  
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.actualPage = page;
      // this.getUsersList(page, this.actualLimit);
    }
  }
}
