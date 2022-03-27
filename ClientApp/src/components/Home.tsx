import * as React from 'react';
import { connect } from 'react-redux';

const Home = () => (
  <div>
    <h1>Привет, мир</h1>
    <p>Здесь я буду делать что-то хз зачем</p>
    <ul>
      <li>Для начала сделана решалка игры быки и коровы</li>
    </ul>
    </div>
);

export default connect()(Home);
