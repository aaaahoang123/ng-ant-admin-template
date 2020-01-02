import {MainState} from '../../store/main.state';
import {AdvertisementState} from '../../modules/advertisement/store/advertisement.state';

export default interface AppState {
  main: MainState;
  advertisement: AdvertisementState;
}
