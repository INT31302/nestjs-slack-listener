import { Member } from '@slack/web-api/dist/response/UsersListResponse';
import { SlackEventType } from '../types/event';
import { Block } from '@slack/web-api';
import { Close, State } from '@slack/web-api/dist/response/ViewsOpenResponse';
import { Enterprise } from '@slack/web-api/dist/response/OauthV2AccessResponse';

export interface IncomingSlackCommand {
  token: string;
  team_id: string;
  team_domain: string;
  channel_id: string;
  channel_name: string;
  user_id: string;
  user_name: string;
  command: string;
  text: string;
  api_app_id: string;
  is_enterprise_install: string;
  response_url: string;
  trigger_id: string;
}

export interface DefaultSlackEvent {
  client_msg_id: string;
  type: SlackEventType;
  subtype?: string;
  text: string;
  user: string;
  ts: string;
  team: string;
  blocks: unknown[];
  channel: string;
  event_ts: string;
  channel_type: string;
  message?: any;
  item?: {
    type: string;
    channel: string;
    ts: string;
  };
  reaction?: string;
  item_user?: string;
}

export interface TeamJoinEvent {
  type: 'team_join';
  user: Member;
}

export interface MessageEvent {
  type: 'message';
  subtype?: string;
  channel: string;
  user: string;
  text: string;
  ts: string;
}

export interface IncomingSlackEvent<T = DefaultSlackEvent> {
  token: string;
  team_id: string;
  api_app_id: string;
  event: T;
  type: string;
  event_id: string;
  event_time: number;
  authorizations: [
    {
      enterprise_id: string | null;
      team_id: string;
      user_id: string;
      is_bot: boolean;
      is_enterprise_install: boolean;
    },
  ];
  is_ext_shared_channel: boolean;
  event_context: string;
  challenge?: string;
}

export interface IncomingSlackInteractivity {
  type: string;
  user: {
    id: string;
    username: string;
    name: string;
    team_id: string;
  };
  api_app_id: string;
  token: string;
  container: {
    type: string;
    message_ts: string;
    channel_id: string;
    is_ephemeral: boolean;
  };
  trigger_id: string;
  team: { id: string; domain: string };
  enterprise: string | null;
  is_enterprise_install: boolean;
  channel: { id: string; name: string };
  message: {
    type: string;
    subtype: string;
    text: string;
    ts: string;
    username: string;
    icons: {
      emoji: string;
      image_64: string;
    };
    bot_id: string;
    blocks: unknown[];
    edited: { user: string; ts: string };
  };
  state: { values: Record<string, any> };
  response_url: string;
  actions: [
    {
      action_id: string;
      block_id: string;
      text: unknown[];
      value: string;
      style: string;
      type: string;
      action_ts: string;
      selected_option?: any;
      selected_user?: string;
      selected_time?: string;
      initial_option?: any;
    },
  ];
}

export interface IncomingSlackViewInteractivity {
  type: string;
  user: {
    id: string;
    username: string;
    name: string;
    team_id: string;
  };
  team: {
    id: string;
    domain: string;
  };
  view: {
    id: string;
    team_id: string;
    type: 'modal';
    blocks: Block[];
    private_metadata: string;
    callback_id: string;
    state: State;
    hash: string;
    title: Close;
    clear_on_close: boolean;
    notify_on_close: boolean;
    close: Close;
    submit: Close;
    previous_view_id: string;
    root_view_id: string;
    app_id: string;
    external_id: string;
    app_installed_team_id: string;
    bot_id: string;
  };
  hash: string;
  response_urls: string[];
  is_enterprise_install: boolean;
  enterprise: Enterprise;
}
