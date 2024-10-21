import { Injectable, inject } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router'
import { RolesService } from '../../auth/services/roles.service'
import { AuthService } from '../../auth/services/auth.service'



@Injectable({
  providedIn: 'root',
})
class AuthGuard {
  constructor(private authService: AuthService, private router: Router, private roleService: RolesService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const dataRoles = route.data?.['roles'] as string[]
    const userRoles = this.roleService.getRole()

    if (this.roleService.getRole()) {
      if (!dataRoles || (dataRoles?.some((x) => userRoles.includes(x)) || dataRoles.length === 0)) {
        return true
      } else {
        this.router.navigateByUrl('/')
        return false
      }
    } else {
      this.router.navigateByUrl('/')
      this.authService.isLogin.set(false)
      return false
    }
  }

}


export const AuthGuardcanActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthGuard).canActivate(route, state)
}
