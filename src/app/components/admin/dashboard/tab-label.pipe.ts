import { Pipe, PipeTransform } from '@angular/core';
import { AdminTab } from '../dashboard/dashboard.component';

@Pipe({ name: 'tabLabel', standalone: true })
export class TabLabelPipe implements PipeTransform {
  transform(tabs: { id: AdminTab; label: string }[], activeId: AdminTab): string {
    return tabs.find((t) => t.id === activeId)?.label ?? '';
  }
}
