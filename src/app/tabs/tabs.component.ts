import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  activeTab: number = 0;

  onTabChange(event: any): void {
    this.activeTab = event.index;
  }
}
