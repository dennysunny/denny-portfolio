import { Component } from '@angular/core';
import { BasicInfoComponent } from '../basic-info/basic-info.component';
import { ExperienceComponent } from '../experience/experience.component';
import { SkillsComponent } from '../skills/skills.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-portfolio-shell',
  standalone: true,
  imports: [BasicInfoComponent, ExperienceComponent, SkillsComponent, AboutComponent, ContactComponent],
  templateUrl: './portfolio-shell.component.html',
})
export class PortfolioShellComponent {}
