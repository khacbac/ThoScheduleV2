import * as React from "react";
import colors from "../res/colors";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import { connect } from "react-redux";
import ReducerName from "../redux/config/ReducerName";

interface Props {
  testNum: number;
}

class DetailScreen extends React.Component<Props> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Text style={styles.headerText}>Tên khách hàng</Text>
          <TextInput
            placeholder="Nhập tên khách hàng"
            style={{ marginVertical: 10 }}
          />
        </View>

        <View style={{ marginTop: 5 }}>
          <Text style={styles.headerText}>Tên người giám hộ</Text>
          <TextInput
            placeholder="Nhập tên người giám hộ"
            style={{ marginVertical: 10 }}
          />
        </View>

        <View style={{ marginTop: 5 }}>
          <Text style={styles.headerText}>Mã khách hàng (*)</Text>
          <TextInput
            placeholder="Nhập mã khách hàng"
            style={{ marginVertical: 10 }}
          />
        </View>

        <View style={{ marginTop: 5 }}>
          <Text style={styles.headerText}>Giờ tư vấn</Text>
          <TextInput
            placeholder="Nhập giờ tư vấn"
            style={{ marginVertical: 10 }}
          />
        </View>

        <View style={{ marginTop: 5 }}>
          <Text style={styles.headerText}>Loại tư vấn</Text>
          <TextInput
            placeholder="Chọn giờ tư vấn"
            style={{ marginVertical: 10 }}
          />
        </View>

        <View style={{ marginTop: 5 }}>
          <Text style={styles.headerText}>Số điện thoại</Text>
          <TextInput
            placeholder="Nhập số điện thoại"
            style={{ marginVertical: 10 }}
          />
        </View>

        <Text style={styles.headerText}>{this.props.testNum}</Text>
      </View>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     setCart: (carts: Array<Cart>) => dispatch(setCart(carts))
//   };
// };

const mapStateToProps = state => {
  return {
    testNum: state[ReducerName.AppReducer].testNum
  };
};

export default connect(
  mapStateToProps
  //   mapDispatchToProps
)(DetailScreen);

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  headerText: {
    color: colors.colorMain,
    fontSize: 16
  }
});
