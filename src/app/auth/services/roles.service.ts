import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { LocalstorageService } from './localstorage.service';
import { roleEnum } from '../../shared/roles/role.enum';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(
    private localStorgeService: LocalstorageService
  ) {}

  getRole() {
    // return (<User | null>(
    //   JSON.parse(this.localStorgeService.getItem('user') as string)
    // ))?.role;

    // handle user role to be static
    return ['user'];
    // return ['admin'];
  }

  isRolesAuthorized(roles: string[]) {
    if (roles?.length == 0) {
      return true;
    }
    const userRole = this.getRole();
    if (userRole) {
      return roles?.some((x) => userRole.includes(x));
    } else {
      return false;
    }
  }

}
