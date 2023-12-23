import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public users: any = [];
  public fullName: string = '';
  public role!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
    private userStore: UserStoreService
  ) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((res) => {
      this.users = res;
    });

    this.userStore.getfullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.authService.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.authService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  logout() {
    if (this.authService.signOut()) {
      this.toastr.success('Successfully Logged Out!', 'SUCCESS');
      this.router.navigate(['login']);
    } else {
      this.toastr.error('Error Logging Out!', 'ERROR');
    }
  }
}
