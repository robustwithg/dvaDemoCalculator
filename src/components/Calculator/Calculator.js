import React, { Fragment } from "react";
import styles from "./index.css"; //由于开启了css model，需要使用这种方式来引入样式
import { connect } from "dva";
import config from "./config";


// class MathOpt{
//   constructor(lib){
//     this._lib = lib
//   }
//   add(x,y){
//     return this._lib.add(x,y)
//   }

// }
// const mathOpt = new MathOpt(Big)


function Calculator(props) {
  //   console.log("props", props);
  function clickLabel (item) {
    const { type, label } = item;

    const numOP = (number) => {
      //分发获取数字按钮的动作
      props.dispatch({
        type: "calculator/numOp",
        numData: number,
      });
    };
    const equalOp = () => {
      //分发获取运算结果的动作
      props.dispatch({
        type: "calculator/equalOp",
      });
    };
    const chartOp = (chartStr) => {
      //分发获取运算符号按钮的动作
      props.dispatch({
        type: "calculator/chartOp",
        payload: {
          chart: chartStr,
        },
      });
    };
    const clearOp = () => {
      //分发获取清零按钮的动作
      props.dispatch({
        type: "calculator/clearOp",
      });
    };
    const backOp = () => {
      //分发获取回退按钮的动作
      props.dispatch({
        type: "calculator/backOp",
      });
    };

    switch (type) {
      case "number":
        numOP(label);
        break;
      case "chart":
        chartOp(label);
        break;
      case "equal":
        equalOp();
        break;
      case "clear":
        clearOp();
        break;
      case "back":
        backOp();
        break;
      default:
        return;
    }
  };
  const resPanelOp = () => {
    //渲染表达式和最后的结果(res)
    if (!props.calculator.res) {
      return props.calculator.data
        .map((item) => {
          return item;
        })
        .join("");
    } else {
      return props.calculator.res;
    }
  };
  return (
    <Fragment>
      <div className={styles.wrapper}>
        <div>
          <input className={styles.show} value={resPanelOp()} placeholder={0} />
        </div>
        <div className={styles.parents}>
          {config.map((item, index) => {
            return (
              <button
                className={styles[item.class]}
                key={index}
                onClick={() => clickLabel(item)}
              >
                {item.label}
              </button>
            ); //styles是一个对象，所以在css model的方式下可以使用对象+键名的方式去书写代码  className={styles[item.class]}
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default connect(({ calculator }) => ({
  calculator,
}))(Calculator);
