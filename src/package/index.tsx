import { Component, Index, JSX, ParentComponent } from 'solid-js';
import {
  isArray,
  isBoolean,
  isNull,
  isNumber,
  isObject,
  isString,
} from './utils';
import './index.scss';

const Preview: Component<{
  data: Record<string, any> | any[];
  maxLength?: number;
}> = ({ data, maxLength = 100 }) => {
  const isArr = isArray(data);
  const prefix = isArr ? '[' : '{';
  const surfix = isArr ? ']' : '}';
  const content: JSX.Element[] = [];
  let count = 2;
  const dataArr = isArr ? data : Object.entries(data);
  for (let i = 0; i < dataArr.length; i++) {
    const key = isArr ? i : dataArr[i][0];
    const value = isArr ? dataArr[i] : dataArr[i][1];

    // the length of ': ' or ', ' characters
    const SeperatorLength = 2;
    if (!isArr) {
      content.push(
        <span class="jsonView__summary__preview__fieldName">{key}</span>,
      );
      count += key.length + SeperatorLength;
    }
    switch (true) {
      case isNull(value):
        count += 4 + SeperatorLength;
        content.push(
          <span class="jsonView__summary__preview__value jsonView__summary__preview__value__null">
            null
          </span>,
        );
        break;
      case isString(value):
        {
          const remainingLength = maxLength - count;
          count += remainingLength + SeperatorLength;
          content.push(
            <span class="jsonView__summary__preview__value jsonView__summary__preview__value__string">
              "{(value as string).slice(0, remainingLength)}
              {remainingLength < value.length ? '…' : ''}"
            </span>,
          );
        }
        break;
      case isNumber(value):
        count += String(value).length + SeperatorLength;
        content.push(
          <span class="jsonView__summary__preview__value jsonView__summary__preview__value__number">
            {value}
          </span>,
        );
        break;
      case isBoolean(value):
        count += (value === false ? 5 : 4) + SeperatorLength;
        content.push(
          <span class="jsonView__summary__preview__value jsonView__summary__preview__value__boolean">
            {value === true ? 'true' : 'false'}
          </span>,
        );
        break;

      case isArray(value):
        count += 3 + SeperatorLength;
        content.push(
          <span class="jsonView__summary__preview__value jsonView__summary__preview__value__null">
            Array({value.length})
          </span>,
        );
        break;
      case isObject(value):
        count += 3 + SeperatorLength;
        content.push(
          <span class="jsonView__summary__preview__value jsonView__summary__preview__value__null">
            &lcub;…&rcub;
          </span>,
        );
        break;
    }
    if (i < dataArr.length - 1) {
      content.push(', ');
      count += SeperatorLength;
      if (count >= maxLength) {
        content.push('…');
        break;
      }
    }
  }

  return (
    <span class="jsonView__summary__preview">
      <span class="jsonView__summary__preview__prefix">{prefix}</span>
      <Index each={content}>{(item) => item()}</Index>
      <span class="jsonView__summary__preview__surfix">{surfix}</span>
    </span>
  );
};

const JsonViewComp: Component<{
  name: string | number;
  data: any;
  maxLength?: number;
}> = ({ data, name, maxLength }) => {
  const Wrap: ParentComponent<{
    type: string;
    hasSummary?: boolean;
    summaryPreview?: JSX.Element;
  }> = ({ type, children, hasSummary = false, summaryPreview }) =>
    hasSummary ? (
      <>
        <summary class="jsonView__summary">
          <span class="jsonView__summary__name">{name}</span>
          {summaryPreview}
        </summary>
        <div
          class={`jsonView__content jsonView__content_wrapper jsonView__content__${type}`}
        >
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
      content = <Wrap type="boolean">{data === true ? 'true' : 'false'}</Wrap>;
      break;
    case isNull(data):
      content = <Wrap type="null">null</Wrap>;
      break;
    case isArray(data):
      content = (
        <details class="jsonView__details">
          <Wrap
            hasSummary
            type="array"
            summaryPreview={<Preview data={data} maxLength={maxLength} />}
          >
            <Index each={data}>
              {(it, i) => <JsonViewComp name={i} data={it()} />}
            </Index>
          </Wrap>
        </details>
      );
      break;
    case isObject(data):
      content = (
        <details class="jsonView__details">
          <Wrap
            hasSummary
            type="object"
            summaryPreview={<Preview data={data} maxLength={maxLength} />}
          >
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
