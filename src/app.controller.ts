import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import TarhelyDataDto from './tarhelydata.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('tarhelyek')
  registerForm() {
    return {};
  }

  @Post()
  @Redirect()
  async register(@Body() userdata: TarhelyDataDto) {
    await db.execute('INSERT INTO tarhelycsomagok (nev, meret, ar) VALUES (?, ?, ?)', [
      userdata.nev, userdata.meret, userdata.ar
    ]);
    return {
      url: '/',
    };
  }

  @Get('/api/tarhely')
  async allTarhely() {
    const [tarhely] = await db.execute(
      'SELECT * FROM tarhelycsomagok'
    );
    return { tarhely: tarhely };
  }

  @Post('/api/tarhely')
  async registerApi(@Body() userdata: TarhelyDataDto) {
    await db.execute('INSERT INTO tarhelycsomagok (nev, meret, ar) VALUES (?, ?, ?)', [
      userdata.nev, userdata.meret, userdata.ar
    ]);
  }


  @Delete('/api/tarhely/:id')
  async deleteTarhelyApi(@Param('id') id: number) {
    await db.execute(
      'DELETE FROM tarhelycsomagok WHERE id = ?',
      [id],
    );
  }
}


