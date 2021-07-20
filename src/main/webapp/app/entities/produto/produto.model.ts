import { ICompra } from 'app/entities/compra/compra.model';
import { ISupermercado } from 'app/entities/supermercado/supermercado.model';

export interface IProduto {
  id?: number;
  nome?: string | null;
  descricao?: string | null;
  quantidade?: number | null;
  preco?: number | null;
  compras?: ICompra[] | null;
  supermercados?: ISupermercado[] | null;
}

export class Produto implements IProduto {
  constructor(
    public id?: number,
    public nome?: string | null,
    public descricao?: string | null,
    public quantidade?: number | null,
    public preco?: number | null,
    public compras?: ICompra[] | null,
    public supermercados?: ISupermercado[] | null
  ) {}
}

export function getProdutoIdentifier(produto: IProduto): number | undefined {
  return produto.id;
}
