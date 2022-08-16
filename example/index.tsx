/* @refresh reload */
import { render } from 'solid-js/web';
import { JsonView, renderJsonView } from '../src';

const data = {
  foo: 1,
  bar: 'text',
  arr: ['text in array', 2, {}],
  obj: {
    text: 'nested text',
    bool: true,
    null: null,
  },
};

const json = JSON.stringify(data);

const App = () => {
  return (
    <div>
      <JsonView json={json} depthIndicator={false} />
      <hr />
    </div>
  );
};

render(() => <App />, document.getElementById('root') as HTMLElement);

renderJsonView(document.getElementById('js-root'), {
  json: json,
  defaultOpen: true,
});
