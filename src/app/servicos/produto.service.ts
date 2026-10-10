import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Produto } from '../models/Produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private url = 'http://localhost:3000/produtos';

  // Dados de fallback caso a API local ainda não tenha sido iniciada
  private produtosPadrao: Produto[] = [
    new Produto(1, 'Jogo 1 - Cyberpunk Neon', 'Ação futurista com gráficos neon em ritmo acelerado.', './assets/img/jogo1.PNG', 300.00),
    new Produto(2, 'Jogo 2 - Pixel Adventure', 'Plataforma clássico 16-bit com fases desafiadoras e moedas.', './assets/img/jogo2.PNG', 200.00),
    new Produto(3, 'Jogo 3 - Arena Esports', 'Simulador competitivo online para os melhores jogadores.', './assets/img/jogo3.PNG', 400.00)
  ];

  constructor(private http: HttpClient) {}

  // 1 e 2. Listar produtos (Tela Inicial e Área Restrita)
  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url).pipe(
      catchError(err => {
        console.warn('API (localhost:3000) indisponível. Carregando dados locais de contingência.', err);
        return of(this.produtosPadrao);
      })
    );
  }

  getProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.url}/${id}`).pipe(
      catchError(err => {
        const prod = this.produtosPadrao.find(p => p.id === id) || this.produtosPadrao[0];
        return of(prod);
      })
    );
  }

  // 4. Cadastrar produto
  cadastrarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.url, produto).pipe(
      catchError(err => {
        console.warn('API offline ao cadastrar. Salvando em memória local.', err);
        produto.id = this.produtosPadrao.length + 1;
        this.produtosPadrao.push(produto);
        return of(produto);
      })
    );
  }

  // Atualizar produto
  atualizarProduto(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.url}/${id}`, produto).pipe(
      catchError(err => {
        const index = this.produtosPadrao.findIndex(p => p.id === id);
        if (index !== -1) {
          this.produtosPadrao[index] = produto;
        }
        return of(produto);
      })
    );
  }

  // Remover produto
  removerProduto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`).pipe(
      catchError(err => {
        this.produtosPadrao = this.produtosPadrao.filter(p => p.id !== id);
        return of({ success: true });
      })
    );
  }
}
