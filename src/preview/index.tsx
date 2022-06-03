/* @refresh reload */
import { render } from 'solid-js/web';
import { JsonView } from '../package';
import './preview.css';
const data = `{
  "TRIGGER_SPLIT": {
    "null": null,
    "count": 135,
    "TRIGGER_SPLIT": {
      "null": null,
      "count": 135,
      "hasCoupon": true,
      "hasCoupon": [1,23,3,4],
      "name": "tommyasddddddddddddddddddddddddddddddddddddtommyasddddddddddddddddddddddddddddddddddddtommyasddddddddddddddddddddddddddddddddddddtommyasdddddddddddddddddddddddddddddddddddd"
    },
    "hasCoupon": true,
    "hasCoupon": [1,23,3,4],
    "name": "tommyasddddddddddddddddddddddddddddddddddddtommyasddddddddddddddddddddddddddddddddddddtommyasddddddddddddddddddddddddddddddddddddtommyasdddddddddddddddddddddddddddddddddddd"
  }
}`;
const App = () => {
  console.log(JSON.parse(data));
  return (
    <div>
      <JsonView json={data} defaultOpen />
    </div>
  );
};

render(() => <App />, document.getElementById('root') as HTMLElement);
