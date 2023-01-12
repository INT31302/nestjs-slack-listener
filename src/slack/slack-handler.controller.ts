import { Body, Controller, Post, Res } from '@nestjs/common';
import { IncomingSlackEvent } from './interfaces';
import { SlackHandler } from './slack-handler.service';
import { Response } from 'express';

@Controller('slack')
export class SlackEventsController {
  constructor(private readonly slackHandler: SlackHandler) {}

  @Post(`events`)
  async handleEvent(@Body() event: IncomingSlackEvent) {
    if (event.challenge) {
      return {
        challenge: event.challenge,
      };
    }
    return this.slackHandler.handleEvent(event);
  }

  @Post(`interactivity`)
  async handleInteractivity(
    @Body() params: { payload: string },
    @Res() response: Response,
  ) {
    const parsedPayload = JSON.parse(params.payload);
    await this.slackHandler.handleInteractivity(parsedPayload);
    return response.status(200).send();
  }
}
