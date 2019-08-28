import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Animated} from 'react-native';
import PropTypes from 'prop-types';

const animationDuration = 150;

class Counter extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  dropNumberAnimation = handler => {
    Animated.timing(this.state.animation, {
      toValue: handler === 'deduct' ? 150 : -150,
      duration: animationDuration,
    }).start();
  };

  restoreNumberAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: animationDuration,
    }).start();
  };

  startAnimation = (handler, counterEvent) => {
    this.dropNumberAnimation(handler);
    setTimeout(() => {
      counterEvent();
      this.setState({
        animation: new Animated.Value(handler === 'deduct' ? -150 : 150),
      });
      this.restoreNumberAnimation(handler);
    }, animationDuration);
  };

  handleDeduct = () => {
    const {onDeduct} = this.props;
    this.startAnimation('deduct', onDeduct);
  };

  handleAdd = () => {
    const {onAdd} = this.props;
    this.startAnimation('add', onAdd);
  };

  render() {
    const {value} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleDeduct}>
          <Text style={styles.button}>-</Text>
        </TouchableOpacity>
        <View style={styles.square}>
          <Animated.Text
            style={{
              ...styles.counter,
              transform: [
                {
                  translateY: this.state.animation,
                },
              ],
            }}>
            {value}
          </Animated.Text>
        </View>
        <TouchableOpacity onPress={this.handleAdd}>
          <Text style={styles.button}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    fontSize: 50,
    padding: 30,
    color: '#B3D9FF',
  },
  square: {
    height: 90,
    width: 90,
    backgroundColor: '#3A78EF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 30,
  },
});

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onDeduct: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default Counter;
