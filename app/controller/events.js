'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormHole = require('stream-wormhole');

class EventsController extends Controller {
  async index () {
    const { ctx } = this;
    const paramsKeys = Object.keys(ctx.query);

    // judge the result whether contains active or headline.
    ctx.body = await ctx.model.Events.find();
    ctx.status = 200;
  }

  async create () {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    // name for custom filename by user
    const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public', filename);
    const writeStream = fs.createWriteStream(target);

    try {
      await awaitWriteStream(stream.pipe(writeStream));

      const { title, content } = stream.fields;
      const newEvent = new ctx.model.Events({
        title,
        content,
        image: '/public/' + filename,
      });

      await newEvent.save();
  
      const { _id } = newEvent;
      ctx.body = `
        imageUri: /public/${filename},
        title: ${title},
        content: ${content},
      `;
      ctx.status = 201;
    } catch (e) {
      await sendToWormHole(stream);
      ctx.body = e.msg;
      ctx.status = 403;
    }
  }

  async show () {
    const { ctx } = this;
    const { id } = ctx.params;

    // get the single event
    const event = await ctx.model.Events.find({ _id: id });
    ctx.body = event[0];
    ctx.status = 200;
  }

  async update () {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    console.log('stream', stream);
    const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public', filename);
    const writeStream = fs.createWriteStream(target);

    try {
      await awaitWriteStream(stream.pipe(writeStream));

      const { id } = ctx.params;
      const { title, content } = stream.fields;

      const body = {
        title,
        content,
        image: '/public/' + filename,
      };

      await ctx.model.Events.update(
        { _id: id },
        { $set: { ...body }},
      );
      ctx.body = 'Update successfully!'
      ctx.status = 200;
    } catch (e) {
      await sendToWormHole(stream);
      ctx.body = e.msg;
    }
  }

  async destroy () {
    const { ctx } = this;
    const { id } = ctx.params;

    try {
      await ctx.model.Events.remove({ _id: id });

      ctx.body = 'Delete successfully!';
    } catch (e) {

      ctx.body = e.msg;
    }
  }
}

module.exports = EventsController;
