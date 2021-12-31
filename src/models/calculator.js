import Big from "big.js";

export default {
  namespace: "calculator",
  state: {
    chart: "",
    res: "",
    data: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    },
  },

  reducers: {
    
    //得到按钮运算符号结果
    chartOp(state, action) {
      //获取按钮的运算符的符号
      state.chart = action.payload.chart;
      state.data.push(state.chart);
      return { ...state};
    },

    //得到按钮数字结果
    numOp(state, action) {
      //获取按钮的数字值
      const numberData = action.numData;
      //改变数组的值
      const data = state.data;
      if (data.length === 0) {
        data.push(numberData);
      } else {
        if (data[data.length - 1] !== state.chart) {
          if(data[data.length-1].length < 9) {   //限制最大数字的位数
            //没有运算符的时候持续改变最后一个数的值
          data[data.length - 1] += numberData;
          }
          
        } else {
          data.push(numberData);
        }
      }
      return { ...state};
    },

    //得到按钮运算结果
    equalOp(state) { 
      let res = null;
      let num = null;
      let chart = null;
      // 判断是不是运算符
      const isChatType = (curChart) => ["+", "-", "x", "÷"].includes(curChart);
      // 运算符计算后结果
      const op = (curChart, n1, n2) => {
        let final = null;
        switch (curChart) {
          case "+":
            final = n1 + n2;
            break;
          case "-":
            final = n1 - n2;
            break;
          case "x":
            final = n1 * n2;
            break;
          case "÷":
            final = n1 / n2;
            break;
          default:
            break;
        }

        return final;
      };
      state.data.forEach((item) => {
        if (!isChatType(item)) {
          // 不是运算符
          if (!num) {
            num = parseFloat(item);
          } else {
            num = op(chart, num, parseFloat(item));
          }
        } else {
          if (num) {
            chart = item;
          }
        }
      });
      res = new Big(num);
      state.res = res.toFixed(9);
      return { ...state };
    },

    //得到按钮清零结果
    clearOp(state) {
      state = {
        chart: "",
        res: "",
        data: [],
      }
      return {...state}
    },

    //得到按钮回退结果
    backOp(state) {
      const dataBack = []
      dataBack.push(state.data[state.data.length-1])
      if (state.data[state.data.length-1] === state.chart) {
        state.data.splice(-1,1)
      }else if((state.data[state.data.length-1] !== state.chart) && (dataBack.join('').length === 1)) {
        state.data.splice(-1,1)
      }else if((state.data[state.data.length-1] !== state.chart) && (dataBack.join('').length > 1)) {
        dataBack.join(',').slice(0,dataBack.join(',').length-1);
        state.data[state.data.length-1] = dataBack.join(',').slice(0,dataBack.join(',').length-1)
      }
      return {...state}
    },
  },


};
