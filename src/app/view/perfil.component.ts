import { Component, OnInit } from '@angular/core';
import { CustomBackgroundComponent } from "../shared/components/custom-background/custom-background.component";
import { Perfil } from '../shared/model/perfil';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../shared/service/admin.service';

@Component({
    selector: 'perfil',
    standalone: true,
    template: `
  <custom-background>
    OLÁAA



</custom-background>
  
  `,
    imports: [
        CustomBackgroundComponent
    ]
})
export class PerfilComponent implements OnInit {
  perfil: Perfil | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const perNrId = Number(params.get('perNrId'));
      this.carregarPerfil(perNrId);
    });
  }
  
  carregarPerfil(perNrId: number): void {
    this.adminService.getPerfilById(perNrId).subscribe(
      (perfil: Perfil) => {
        this.perfil = perfil;
      },
      (error) => {
        console.error('Erro ao obter detalhes do perfil:', error);
      }
    );
  }
}