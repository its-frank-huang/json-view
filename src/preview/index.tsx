/* @refresh reload */
import { render } from 'solid-js/web';
import { JsonView } from '../package';

const data = `{
  "TRIGGER_SPLIT": {
    "id": "605dc075adc34fdca8dc4811af9d4f83",
    "description": "Signup source is Automizely Marketing popups and forms, with or without coupon offer",
    "result_key": "_mOetrAlY",
    "definition": {
      "if": {
        "key": "source",
        "op": "or",
        "exprs": [
          {
            "op": "str_eq",
            "key": "source_type",
            "left": "{{$input.event_payload.source_type}}",
            "right": "popup_subscribers"
          },
          {
            "op": "str_eq",
            "key": "source_type",
            "left": "{{$input.event_payload.source_type}}",
            "right": "form_submissions"
          },
          {
            "op": "str_eq",
            "key": "source_type",
            "left": "{{$input.event_payload.source_type}}",
            "right": "signup_form_submissions"
          }
        ]
      },
      "then": {
        "steps": []
      },
      "else": {
        "steps": []
      },
      "minimumCheckoutValue": "100",
      "signupSource": "popups&forms",
      "withCoupon": "all"
    }
  },
  "SEND_SMS": {
    "id": "1253a036765248dd95efdf4296907e33",
    "type": "SEND_SMS",
    "description": "",
    "result_key": "_uaRopx2B",
    "definition": {
      "msg_content_id": "",
      "header": "*|STORE_NAME|*",
      "body": ": Hi! Here's your welcome gift: *|WELCOME_COUPON_CODE|*. Shop now at *|STORE_URL|*",
      "footer": "Text STOP to opt out.",
      "coupon_settings": {
        "enabled": false,
        "coupon_campaign_id": ""
      }
    }
  }
}`;
const App = () => {
  return (
    <div>
      <JsonView json={data} />
    </div>
  );
};

render(() => <App />, document.getElementById('root') as HTMLElement);
