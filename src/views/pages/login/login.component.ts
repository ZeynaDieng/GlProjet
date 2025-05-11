import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../../../services/toastr.service';
import { setLocalData } from '../../../utils/local-storage-service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toast: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmitLogin() {
    if (this.loginForm.valid) {
      this.spinner.show();
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          let message = response.message;
console.log('response', response);

          let organisationId = response.data.id;
          let organisationCategory = response.data.category;
          let accessToken = response.data.access_token;
        let organisation = response.data;
          let userInfos = {
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            phone: response.data.phone,
            roles: response.data.roles,
          };
          const roles = userInfos?.roles;
          console.log('roles', roles);
          // const redirectUrl = this.authService.getRedirectRouteByRole(roles);
          const redirectUrl = '/overview';
          console.log('redirectUrl', redirectUrl);
          this.router.navigate([redirectUrl], {
            replaceUrl: true,
          });
          
          this.toast.showSuccess(message);

          console.log('roles', roles);


          setLocalData('accessToken', accessToken);
        },
        error: (error) => {
          let errorMessage = error.error?.message;
          this.spinner.hide();
          this.toast.showError(
            errorMessage ?? 'Une Erreur est survenue. Réessayez plus tard!'
          );
        },
        complete: () => {
          this.spinner.hide();
          console.log('COMPLETE');
        },
      });
    }
  }
}
