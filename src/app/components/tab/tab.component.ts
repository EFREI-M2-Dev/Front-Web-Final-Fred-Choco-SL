import {Component, Input, OnInit} from '@angular/core';
import {TabService} from "./tab.service";


@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  standalone: false
})
export class TabComponent implements OnInit {
  @Input() title = 'Default Title';
  @Input() icon = 'settings';
  @Input() isActive = false;  // Cette propriété ne sera plus utilisée ici
  @Input() roundedLeft = false;
  @Input() roundedRight = false;

  constructor(private tabService: TabService) {}

  ngOnInit() {
    this.tabService.activeTab$.subscribe(activeTab => {
      this.isActive = activeTab === this.title;
    });
  }

  activateTab() {
    this.tabService.setActiveTab(this.title);
  }
}
