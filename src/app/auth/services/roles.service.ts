import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(
    private localStorgeService: LocalstorageService
  ) {}

  getRole() {
    return (<User | null>(
      JSON.parse(this.localStorgeService.getItem('user') as string)
    ))?.role;
  }

  getPermissions() {
    return (<User | null>(
      JSON.parse(this.localStorgeService.getItem('user') as string)
    ))?.permissions;
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

  isPermissionsAuthorized(permissions: string[]) {
    if (permissions.length == 0) {
      return true;
    }
    const userPermissions = this.getPermissions();
    if (userPermissions) {
      return permissions.some((x) => userPermissions.includes(x));
    } else {
      return false;
    }
  }
}
