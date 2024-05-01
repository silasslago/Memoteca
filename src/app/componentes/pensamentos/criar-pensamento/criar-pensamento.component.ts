import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {


  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: 'modelo1'
  }

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if(id !== null) {
      this.pensamentoService.buscarPorId(Number(id)).subscribe(pensamento => {
        this.pensamento = pensamento;
      })
    }
  }

  criarPensamento(): void {
    if(this.pensamento.id === 0) {
      this.pensamentoService.criar(this.pensamento).subscribe(() => {
        this.router.navigate(["/listarPensamento"]);
      });
    }else {
      this.pensamentoService.atualizarPensamento(this.pensamento).subscribe(() => {
        this.router.navigate(["/listarPensamento"]);
      });
    }
  }

  cancelar(): void {

  }

}
