import { ICompra } from 'app/entities/compra/compra.model';
import { StatusUsuario } from 'app/entities/enumerations/status-usuario.model';

export interface IUsuario {
  id?: number;
  usuario?: string | null;
  nome?: string | null;
  sobrenome?: string | null;
  email?: string | null;
  senha?: string | null;
  telefone?: string | null;
  status?: StatusUsuario | null;
  compras?: ICompra[] | null;
}

export class Usuario implements IUsuario {
  constructor(
    public id?: number,
    public usuario?: string | null,
    public nome?: string | null,
    public sobrenome?: string | null,
    public email?: string | null,
    public senha?: string | null,
    public telefone?: string | null,
    public status?: StatusUsuario | null,
    public compras?: ICompra[] | null
  ) {}
}

export function getUsuarioIdentifier(usuario: IUsuario): number | undefined {
  return usuario.id;
}
