import { Body, Controller, Get, Post, Req, Res, Session, UseGuards } from "@nestjs/common";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { UsuarioService } from "src/usuario/usuario.service";
import { AutenticacionService } from "./autenticacion.service";
import { AutenticacionGuard } from "./guard/autenticacion.guard";

  
  @Controller('autenticacion')
  export class AutenticacionController {
    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _autenticacionService: AutenticacionService
    ) {}
  
    @Post('login')
    @UseGuards(AutenticacionGuard)
    async login(
      @Body('correo') correo,
      @Body('password') password,
      @Session() session,
    ): Promise<UsuarioEntity> {
      return await this._autenticacionService.autenticarUsuario({ correo, password });
    }
  
    @Get('logout')
    logout(@Req() request, @Res() response) {
      request.logout();
      request.session.destroy();
      console.log('logout');
    }
  
    @Post('buscarUsuarioPorCorreo')
    async buscarUsuarioPorCorreo(@Body('correo') correo): Promise<UsuarioEntity> {
      return await this._usuarioService.buscarUsuarioPorCorreo(correo);
    }
  }
  