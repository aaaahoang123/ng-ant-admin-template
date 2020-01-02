import {CommonStatus} from '../enums/status/common-status.enum';
import {AdGroup} from '../enums/type/ad-group.enum';

export interface Advertisement {
  id: number;
  name: string;
  group_ad: AdGroup;
  link?: string;
  code: string;
  image?: string;
  active: CommonStatus;
  active_title: string;
  position: number;
}
