import { linkType } from './router';

export interface UpdateSidebarLinksFunc {
  (value: linkType[]): void;
}
