import { NavLinkType } from './router';

export interface UpdateSidebarLinksFunc {
  (value: NavLinkType[]): void;
}
