import { Component, Index, JSX, ParentComponent } from 'solid-js';
import {
  isArray,
  isBoolean,
  isNull,
  isNumber,
  isObject,
  isString,
} from './utils';
import './index.css';

const JsonViewComp: Component<{ name: string | number; data: any }> = ({
  data,
  name,
}) => {
  const Wrap: ParentComponent<{
    type: string;
    hasSummary?: boolean;
  }> = ({ type, children, hasSummary = false }) =>
    hasSummary ? (
      <>
        <summary class="jsonView__summary">{name}</summary>
        <div class={`jsonView__content jsonView__content__${type}`}>
          {children}
        </div>
      </>
    ) : (
      <div class={`jsonView__content jsonView__content__${type}`}>
        <span class="jsonView__content__name">{name}</span>
        <span class="jsonView__content__data">{children}</span>
      </div>
    );

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
        <details class="jsonView__details">
          <summary class="jsonView__summary">{name}</summary>
          <Wrap hasSummary type="array">
            <Index each={data}>
              {(it, i) => <JsonViewComp name={i} data={it} />}
            </Index>
          </Wrap>
        </details>
      );
      break;
    case isObject(data):
      content = (
        <details class="jsonView__details">
          <summary class="jsonView__summary">{name}</summary>
          <Wrap hasSummary type="object">
            <Index each={Object.entries(data)}>
              {(it) => <JsonViewComp name={it()[0]} data={it()[1]} />}
            </Index>
          </Wrap>
        </details>
      );
      break;
  }
  return content;
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
      <details class="jsonView__details">
        <summary class="jsonView__summary">
          {isArr ? `[${data.length}]` : `{${Object.keys(data).length}}`}
        </summary>
        <div class="jsonView__content">
          {isArr ? (
            <Index each={data()}>
              {(value, i) => <JsonViewComp name={i} data={value()} />}
            </Index>
          ) : (
            <Index each={Object.entries(data)}>
              {(it) => <JsonViewComp name={it()[0]} data={it()[1]} />}
            </Index>
          )}
        </div>
      </details>
    </div>
  );
};
