import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import {
  clearLocalStorage,
  getLocalData,
} from '../../../utils/local-storage-service';
import { OrganisationCategory, UserRoles } from '../../../utils/enums';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-nav-bar',
  imports: [CommonModule, RouterModule],
  templateUrl: './side-nav-bar.component.html',
  styleUrl: './side-nav-bar.component.css',
})
export class SideNavBarComponent {
  current_router: string = '/';
  dropdowns: any = {
    management: false,
    clients: false,
    parametres: false,
  };

  isProfileMenuOpen!: boolean;
  isSidebarOpen = false;
  screenWidth!: number;

  @ViewChild('profileMenu') profileMenuRef!: ElementRef;

  constructor(private router: Router, private authService: AuthService) {
    if (typeof window !== 'undefined') {
      this.screenWidth = window.innerWidth;
    }

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/' || this.router.url === '/overview') {
          this.current_router = this.router.url;
          console.log(this.current_router);
        }
      }
    });
  }

  toggleDropdown(menu: string) {
    this.dropdowns[menu] = !this.dropdowns[menu];
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  isMdAndAbove(): boolean {
    return this.screenWidth >= 768;
  }

  isOrganisationProvider(): boolean {
    const category = getLocalData('organisationCategory');
    return category == OrganisationCategory.provider;
  }

  isOwner() {
    const role = this.authService.getUserRole();
    return role == UserRoles.owner;
  }

  toggleProfileMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout() {
    Swal.fire({
      title: 'Se déconnecter?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#FC2828',
      cancelButtonColor: '#9CA3AF',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
        clearLocalStorage();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      this.isProfileMenuOpen &&
      this.profileMenuRef &&
      !this.profileMenuRef.nativeElement.contains(event.target)
    ) {
      this.isProfileMenuOpen = false;
    }
  }
}
