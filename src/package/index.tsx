import {
	children,
	Component,
	createSignal,
	Index,
	JSX,
	ParentComponent,
	Show,
} from "solid-js";
import {
	isArray,
	isBoolean,
	isNull,
	isNumber,
	isObject,
	isString,
} from "./utils";
import "./index.scss";

const Preview: Component<{
	data: Record<string, any> | any[];
	maxLength?: number;
	opened?: () => boolean;
}> = ({ data, maxLength = 100, opened }) => {
	const isArr = isArray(data);
	const prefix = isArr ? "[" : "{";
	const surfix = isArr ? "]" : "}";
	const content: JSX.Element[] = [];
	const contentWhenOpened: JSX.Element[] = [];
	let count = 2;
	const dataArr = isArr ? data : Object.entries(data);

	if (isArr) {
		contentWhenOpened.push(
			<span class="jsonView__summary__preview__value jsonView__summary__preview__value__null">
				Array({data.length})
			</span>
		);
	}
	for (let i = 0; i < dataArr.length; i++) {
		const key = isArr ? i : dataArr[i][0];
		const value = isArr ? dataArr[i] : dataArr[i][1];

		// the length of ': ' or ', ' characters
		const SeperatorLength = 2;
		if (!isArr) {
			content.push(
				<span class="jsonView__summary__preview__fieldName">{key}</span>
			);
			count += key.length + SeperatorLength;
		}
		switch (true) {
			case isNull(value):
				count += 4 + SeperatorLength;
				content.push(
					<span class="jsonView__summary__preview__value jsonView__summary__preview__value__null">
						null
					</span>
				);
				break;
			case isString(value):
				{
					const remainingLength = maxLength - count;
					count += remainingLength + SeperatorLength;
					content.push(
						<span class="jsonView__summary__preview__value jsonView__summary__preview__value__string">
							"{(value as string).slice(0, remainingLength)}
							{remainingLength < value.length ? "…" : ""}"
						</span>
					);
				}
				break;
			case isNumber(value):
				count += String(value).length + SeperatorLength;
				content.push(
					<span class="jsonView__summary__preview__value jsonView__summary__preview__value__number">
						{value}
					</span>
				);
				break;
			case isBoolean(value):
				count += (value === false ? 5 : 4) + SeperatorLength;
				content.push(
					<span class="jsonView__summary__preview__value jsonView__summary__preview__value__boolean">
						{value === true ? "true" : "false"}
					</span>
				);
				break;

			case isArray(value):
				count += 3 + SeperatorLength;
				content.push(
					<span class="jsonView__summary__preview__value jsonView__summary__preview__value__null">
						Array({value.length})
					</span>
				);
				break;
			case isObject(value):
				count += 3 + SeperatorLength;
				content.push(
					<span class="jsonView__summary__preview__value jsonView__summary__preview__value__null">
						&lcub;…&rcub;
					</span>
				);
				break;
		}
		if (i < dataArr.length - 1) {
			content.push(", ");
			count += SeperatorLength;
			if (count >= maxLength) {
				content.push("…");
				break;
			}
		}
	}

	const renderContent = () => {
		if (isArray(data) && opened && opened()) {
			return <Index each={contentWhenOpened}>{(item) => item()}</Index>;
		} else {
			return <Index each={content}>{(item) => item()}</Index>;
		}
	};

	return (
		<span class="jsonView__summary__preview">
			<span class="jsonView__summary__preview__prefix">{prefix}</span>
			{renderContent()}
			{(opened ? !opened() : true) && (
				<span class="jsonView__summary__preview__surfix">{surfix}</span>
			)}
		</span>
	);
};

const JsonViewComp: Component<{
	name: string | number;
	data: any;
	defaultOpen?: boolean;
	maxLength?: number;
}> = ({ data, name, maxLength, defaultOpen = false }) => {
	const [isOpen, setIsOpen] = createSignal(defaultOpen);
	const Wrap: ParentComponent<{
		type: string;
		hasSummary?: boolean;
		summaryPreview?: JSX.Element;
	}> = ({ type, children, hasSummary = false, summaryPreview }) =>
		hasSummary ? (
			<>
				<summary class={`${isOpen() && "open"} jsonView__summary`}>
					<span
						class="jsonView__summary__name hoverable"
						title="Click to copy object"
						onClick={() => {
							// copy to clipboard
							const el = document.createElement("textarea");
							el.value = JSON.stringify(data);
							document.body.appendChild(el);
							el.select();
							document.execCommand("copy");
							document.body.removeChild(el);
							alert("Copied to clipboard");
						}}
					>
						{name}
					</span>
					{name ? ": " : ""}
					{summaryPreview}
				</summary>
				<div
					class={`jsonView__content jsonView__content_wrapper jsonView__content__${type}`}
				>
					{children}
				</div>
				{["object", "array"].includes(type) && (
					<span class="jsonView__summary__preview__surfix">
						{type === "array" ? "]" : "}"}
					</span>
				)}
			</>
		) : (
			<div class={`jsonView__content jsonView__content__${type}`}>
				<span class="jsonView__content__name">{name}</span>
				<span class="jsonView__content__data">{children}</span>
			</div>
		);

	let content: JSX.Element;
	const Details: ParentComponent = ({ children }) => (
		<details
			class="jsonView__details"
			open={isOpen()}
			onToggle={(e) => {
				setIsOpen((e.target as any).open);
			}}
		>
			{children}
		</details>
	);
	switch (true) {
		case isString(data):
			content = <Wrap type="string">"{data}"</Wrap>;
			break;
		case isNumber(data):
			content = <Wrap type="number">{data}</Wrap>;
			break;
		case isBoolean(data):
			content = (
				<Wrap type="boolean">{data === true ? "true" : "false"}</Wrap>
			);
			break;
		case isNull(data):
			content = <Wrap type="null">null</Wrap>;
			break;
		case isArray(data):
			content = (
				<Details>
					<Wrap
						hasSummary
						type="array"
						summaryPreview={
							<Preview
								data={data}
								maxLength={maxLength}
								opened={isOpen}
							/>
						}
					>
						<Show when={isOpen()}>
							<Index each={data}>
								{(it, i) => (
									<JsonViewComp name={i} data={it()} />
								)}
							</Index>
						</Show>
					</Wrap>
				</Details>
			);
			break;
		case isObject(data):
			content = (
				<Details>
					<Wrap
						hasSummary
						type="object"
						summaryPreview={
							<Preview
								data={data}
								maxLength={maxLength}
								opened={isOpen}
							/>
						}
					>
						<Show when={isOpen()}>
							<Index each={Object.entries(data)}>
								{(it) => (
									<JsonViewComp
										name={it()[0]}
										data={it()[1]}
									/>
								)}
							</Index>
						</Show>
					</Wrap>
				</Details>
			);
			break;
	}
	return content;
};

export const JsonView: Component<{
	json: string;
	defaultOpen?: boolean;
	maxLength?: number;
}> = ({ json, defaultOpen, maxLength }) => {
	let data: any;
	try {
		data = JSON.parse(json);
	} catch (e) {
		console.error(e);
		return <div>Failed to parse json.</div>;
	}
	return (
		<div class="jsonView__container">
			<JsonViewComp
				name=""
				data={data}
				defaultOpen={defaultOpen}
				maxLength={maxLength}
			/>
		</div>
	);
};
