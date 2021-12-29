import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import Calculator from '../components/Calculator/Calculator';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <Calculator/>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
