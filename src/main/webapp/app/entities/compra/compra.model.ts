import * as dayjs from 'dayjs';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { IProduto } from 'app/entities/produto/produto.model';
import { Status } from 'app/entities/enumerations/status.model';

export interface ICompra {
  id?: number;
  datacompra?: dayjs.Dayjs | null;
  idPedido?: number | null;
  quantidade?: number | null;
  status?: Status | null;
  usuario?: IUsuario | null;
  produtos?: IProduto[] | null;
}

export class Compra implements ICompra {
  constructor(
    public id?: number,
    public datacompra?: dayjs.Dayjs | null,
    public idPedido?: number | null,
    public quantidade?: number | null,
    public status?: Status | null,
    public usuario?: IUsuario | null,
    public produtos?: IProduto[] | null
  ) {}
}

export function getCompraIdentifier(compra: ICompra): number | undefined {
  return compra.id;
}
