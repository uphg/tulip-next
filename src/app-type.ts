import { LinkType } from './router';

export interface UpdateSidebarLinksFunc {
  (value: LinkType[]): void;
}
