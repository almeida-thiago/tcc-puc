export enum Errors {
  E404 = 'not found',
  E401 = 'access denied',
  E429 = 'too many requests',
  EUC1 = 'cannot create user',
  EUR2 = 'cannot read users',
  EUU3 = 'cannot update user',
  EUD4 = 'cannot delete user',
  EPC1 = 'cannot create user permission',
  EPR2 = 'cannot read users permissions',
  EPU3 = 'cannot update user permission',
  EPD4 = 'cannot delete user permission',
  ERC2 = 'cannot change pasword',
  ERF1 = 'cannot forgot password',
  EAL1 = 'cannot login user',
  EAR2 = 'cannot renew token',
  EAV3 = 'cannot validate token'
}
