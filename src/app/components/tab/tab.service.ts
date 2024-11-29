import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Le service sera accessible dans toute l'application
})
export class TabService {
  // On utilise un BehaviorSubject pour suivre l'état de l'onglet actif
  private activeTabSubject = new BehaviorSubject<string>('Projets');  // Onglet par défaut
  activeTab$ = this.activeTabSubject.asObservable();

  constructor() {}

  // Méthode pour changer l'onglet actif
  setActiveTab(tab: string) {
    this.activeTabSubject.next(tab);
  }
}
