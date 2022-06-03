/* @refresh reload */
import { render } from 'solid-js/web';
import { JsonView } from '../package';
import './preview.css';
const data = `{
  "TRIGGER_SPLIT": {
    "count": 135,
    "hasCoupon": true,
    "name": "Tommy"
  }
}`;
const App = () => {
  console.log(JSON.parse(data));
  return (
    <div>
      <JsonView json={data} />
    </div>
  );
};

render(() => <App />, document.getElementById('root') as HTMLElement);
