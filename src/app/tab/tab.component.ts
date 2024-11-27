import { Component, Input, OnInit } from '@angular/core';
import {TabService} from "./tab.service";


@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  standalone: false
})
export class TabComponent implements OnInit {
  @Input() tabTitle = 'Default Title';
  @Input() tabIcon = 'settings';
  @Input() isActive = false;  // Cette propriété ne sera plus utilisée ici

  constructor(private tabService: TabService) {}

  ngOnInit() {
    this.tabService.activeTab$.subscribe(activeTab => {
      this.isActive = activeTab === this.tabTitle;
    });
  }

  activateTab() {
    this.tabService.setActiveTab(this.tabTitle);
  }
}
