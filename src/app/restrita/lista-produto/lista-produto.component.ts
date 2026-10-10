import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/Produto.model';
import { ProdutoService } from '../../servicos/produto.service';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})
export class ListaProdutoComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados;
      },
      error: (err) => {
        console.error('Erro ao listar produtos da API:', err);
      }
    });
  }

  excluir(id: number): void {
    if (confirm(`Deseja realmente excluir o produto #${id}?`)) {
      this.produtoService.removerProduto(id).subscribe({
        next: () => {
          alert('Produto removido com sucesso!');
          this.carregarProdutos();
        },
        error: (err) => {
          console.error('Erro ao excluir produto:', err);
        }
      });
    }
  }
}
