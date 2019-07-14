import * as React from "react";
import { View, Text, Image } from "react-native";
import { connect } from "react-redux";
import ReducerName from "../redux/config/ReducerName";
import { DaySchedule } from "./HomeScreen";
import { AdvisoryType } from "../model/Advisory";
import ConfigParam from "../config/ConfigParam";

interface Props {
  datas: any;
}

interface State {}

class SalaryScreen extends React.Component<Props, State> {
  _renderSaraly = () => {
    let allKeys = Object.keys(this.props.datas);

    let salary = 0;

    allKeys.forEach(item => {
      let listDS: Array<DaySchedule> = this.props.datas[item];
      if (listDS && listDS.length > 0) {
        listDS.forEach(ds => {
          let s = ConfigParam.getAdvisorys().find(i => {
            return i.type == ds.advisoryType;
          }).salary;
          salary += s;
        });
      }
    });

    console.log("BACHK__renderSaraly: ", allKeys);
    return (
      <View>
        <Text>adaadd {salary}</Text>
      </View>
    );
  };

  render() {
    return <View>{this._renderSaraly()}</View>;
  }
}

const mapStateToProps = state => {
  return {
    datas: state[ReducerName.AppReducer].datas
  };
};

export default connect(mapStateToProps)(SalaryScreen);
