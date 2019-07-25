import * as React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import ReducerName from "../redux/config/ReducerName";
import moment from "moment";
import colors from "../res/colors";
import { SafeAreaView } from "react-navigation";
import NavigationUtils, { Navigation } from "../utills/NavigationUtils";
import CalendarDay from "../model/CalendarDay";

interface Props {
  // datas: any;
  navigation: Navigation<any>;
}

interface State {}

class Month {
  name: string;
  number: number;
}

class SalaryScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: new Date().getFullYear().toString()
    };
  };

  private months: Array<Month>;

  constructor(props) {
    super(props);

    this.months = moment.months().map((i, index) => {
      let ms = new Month();
      ms.name = i;
      ms.number = index;
      return ms;
    });
  }

  _renderMonths = () => {
    return (
      <View>
        <FlatList
          data={this.months}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.name}
        />
      </View>
    );
  };

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let cd = new CalendarDay();
          cd.month = item.number;
          cd.year = new Date().getFullYear();
          cd.timestamp = new Date(cd.year, cd.month).getTime();
          NavigationUtils.toSalaryForMonthScreen(this.props.navigation, cd);
        }}
        style={{
          padding: 20,
          backgroundColor: colors.colorWhite,
          shadowColor: colors.colorBlackMedium,
          shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 0.3,
          margin: 10
        }}
      >
        <Text style={{ fontSize: 16, color: colors.colorBlack }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return <SafeAreaView>{this._renderMonths()}</SafeAreaView>;
  }
}

const mapStateToProps = state => {
  return {
    datas: state[ReducerName.AppReducer].datas
  };
};

export default connect(mapStateToProps)(SalaryScreen);
