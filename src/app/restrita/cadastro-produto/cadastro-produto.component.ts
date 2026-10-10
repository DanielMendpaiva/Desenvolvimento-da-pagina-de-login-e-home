import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../../models/Produto.model';
import { ProdutoService } from '../../servicos/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent {
  produto: Produto = new Produto(0, '', '', './assets/img/jogo1.PNG', 0);

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  cadastrar(): void {
    if (!this.produto.produto || !this.produto.descricao || this.produto.preco <= 0) {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
      return;
    }

    this.produtoService.cadastrarProduto(this.produto).subscribe({
      next: () => {
        alert('Produto cadastrado com sucesso na API!');
        this.router.navigate(['/restrita/lista']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar produto:', err);
        alert('Erro ao cadastrar produto na API.');
      }
    });
  }
}
