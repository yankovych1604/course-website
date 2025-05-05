import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { PermissionsService } from "../../_services/permissions/permissions.service";

export const authGuard: CanActivateFn = () => {
  return inject(PermissionsService).canActivate();
};
