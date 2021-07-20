import { IProduto } from 'app/entities/produto/produto.model';

export interface ISupermercado {
  id?: number;
  nome?: string | null;
  cnpj?: string | null;
  produtos?: IProduto[] | null;
}

export class Supermercado implements ISupermercado {
  constructor(public id?: number, public nome?: string | null, public cnpj?: string | null, public produtos?: IProduto[] | null) {}
}

export function getSupermercadoIdentifier(supermercado: ISupermercado): number | undefined {
  return supermercado.id;
}
