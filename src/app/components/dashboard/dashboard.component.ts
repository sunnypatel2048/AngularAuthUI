import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  logOut() {
    if(this.authService.signOut()) {
      this.toastr.success("Successfully Logged Out!", "SUCCESS")
      this.router.navigate(['login'])
    }
    else {
      this.toastr.error("Error Logging Out!", "ERROR")
    }
  }
}
