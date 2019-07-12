import Screenname from "../config/ScreenName";

export class Navigation {
  public navigate: (name: string, param?: any) => void;
}

export default class NavigationUtils {
  public static toDetailScreen(navigation: Navigation) {
    navigation.navigate(Screenname.DetailScreen);
  }
}
