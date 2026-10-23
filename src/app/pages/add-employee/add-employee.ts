import { Component, inject, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  email,
  form,
  maxLength,
  minLength,
  pattern,
  required,
  disabled,
} from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { TeamStore } from '../../service/team-store';
import { DepartmentApi } from '../../api/departmet-api';
import { toSignal } from '@angular/core/rxjs-interop';

// Le modèle du formulaire : une propriété par champ.
interface EmployeeDraft {
  firstName: string;
  lastName: string;
  email: string;
  job: string;
  department: string;
  remote: boolean;
}

// Les valeurs de départ, réutilisées pour vider le formulaire (module 19).
const EMPTY_DRAFT: EmployeeDraft = {
  firstName: '',
  lastName: '',
  email: '',
  job: '',
  department: 'Informatique',
  remote: false,
};

@Component({
  imports: [FormField, MatButton, FormRoot],
  selector: 'app-add-employee',
  styleUrl: './add-employee.css',
  templateUrl: './add-employee.html',
})
export class AddEmployee {
  private readonly store = inject(TeamStore);
  private readonly router = inject(Router);
  protected readonly submitAttempted = signal(false);
  private readonly departmentApi = inject(DepartmentApi);

  // La liste des services vient de l'API : Observable -> signal.
  protected readonly departments = toSignal(this.departmentApi.getNames());

  private readonly draft = signal<EmployeeDraft>({ ...EMPTY_DRAFT }); //copie EMPTY_DRAFT pour ne pas modifier l'original

  protected readonly employeeForm = form(
    //chargement données

    this.draft,
    // Le schéma : les règles de validation de chaque champ.
    (path) => {
      required(path.firstName, { message: 'Le prénom est obligatoire.' });
      required(path.lastName, { message: 'Le nom est obligatoire.' });
      minLength(path.lastName, 2, { message: 'Le nom doit contenir au moins 2 lettres.' });
      required(path.email, { message: "L'e-mail est obligatoire." });
      email(path.email, {
        message: "L'e-mail n'est pas valide (exemple : prenom.nom@techcorp.fr).",
      });
      required(path.job, { message: 'Le poste est obligatoire.' });
      maxLength(path.job, 40, { message: 'Le poste ne doit pas dépasser 40 caractères.' });
      pattern(path.email, /\S+@techcorp\.fr$/, {
        message: "L'e-mail doit se terminer par @techcorp.fr.",
      });
      // Désactivé tant que la liste n'est pas arrivée
      disabled(path.department, {
        when: () => (this.departments() === undefined ? 'Chargement des services...' : false),
      });
    },
    {
      submission: {
        action: async () => this.save(),
        onInvalid: async () => this.submitAttempted.set(true),
      },
    },
  );

  protected resetForm(): void {
    this.employeeForm().reset({ ...EMPTY_DRAFT });
  }

  private async save(): Promise<void> {
    this.store.add(this.draft());
    this.resetForm();
    await this.router.navigate(['/equipe']);
  }
}
