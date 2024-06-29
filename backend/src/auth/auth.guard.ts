import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';//Importamos la guardia JWT

@Injectable()
//Y la exportamos para poder usarla
export class JwtAuthGuard extends AuthGuard('jwt') {}
