import { Component, Index, JSX, ParentComponent } from 'solid-js';
import {
  isArray,
  isBoolean,
  isNull,
  isNumber,
  isObject,
  isString,
} from './utils';

const Wrap: ParentComponent<{ type: string }> = ({ type, children }) => (
  <div class={`jsonView__content jsonView__content__${type}`}>{children}</div>
);

const JsonViewComp: Component<{ name: string | number; data: any }> = ({
  data,
  name,
}) => {
  let content: JSX.Element;
  switch (true) {
    case isString(data):
      content = <Wrap type="string">"{data}"</Wrap>;
      break;
    case isNumber(data):
      content = <Wrap type="number">{data}</Wrap>;
      break;
    case isBoolean(data):
      content = <Wrap type="boolean">{data}</Wrap>;
      break;
    case isNull(data):
      content = <Wrap type="null">{data}</Wrap>;
      break;
    case isArray(data):
      content = (
        <Wrap type="array">
          <Index each={data}>
            {(it, i) => <JsonViewComp name={i} data={it} />}
          </Index>
        </Wrap>
      );
      break;
    case isObject(data):
      content = (
        <Wrap type="object">
          <Index each={Object.entries(data)}>
            {([key, val]: any) => <JsonViewComp name={key} data={val} />}
          </Index>
        </Wrap>
      );
      break;
  }
  return (
    <summary class="jsonView__summary">
      <div class="jsonView__summaryText">{name}</div>
      <details class="jsonView__summary">{content}</details>
    </summary>
  );
};

export const JsonView: Component<{ json: string }> = ({ json }) => {
  let data: any;
  try {
    data = JSON.parse(json);
  } catch (e) {
    console.error(e);
    return <div>Failed to parse json.</div>;
  }
  const isArr = isArray(data);
  return (
    <div class="jsonView__container">
      <summary class="jsonView__summary">
        <div class="jsonView__summaryText">
          {isArr ? `[${data.length}]` : `{${Object.keys(data).length}}`}
        </div>
        <details class="jsonView__details">
          {isArr ? (
            <Index each={data}>
              {(value, i) => <JsonViewComp name={i} data={value} />}
            </Index>
          ) : (
            <Index each={Object.entries(data)}>
              {([key, value]: any) => <JsonViewComp name={key} data={value} />}
            </Index>
          )}
        </details>
      </summary>
    </div>
  );
};
